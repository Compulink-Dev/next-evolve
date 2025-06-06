import { paynowService } from "@/lib/paynow";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { paymentMethod, mobileNumber, email, tierName, tierPrice } = await request.json();

    console.log("Payload ", {
      paymentMethod,
      mobileNumber,
      email,
      tierName,
      tierPrice
    });

      // Add validation
      if (!paymentMethod || !email || !tierName || !tierPrice) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
  
      if (paymentMethod !== 'web' && !mobileNumber) {
        return NextResponse.json(
          { error: 'Mobile number required for mobile payments' },
          { status: 400 }
        );
      }


    const response = await paynowService.initiatePayment({
      reference: `Sponsorship-${tierName}-${Date.now()}`,
      amount: tierPrice,
      email,
      paymentMethod,
      mobileNumber: paymentMethod !== 'web' ? mobileNumber : undefined
    });

    if (!response.success) {
      console.error('Paynow error:', response.error);
      return NextResponse.json(
        { error: response.error || 'Payment initiation failed' },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 },
    );
  }
}