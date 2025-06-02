import { paynowService } from "@/lib/paynow";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { paymentMethod, mobileNumber, email, tierName, tierPrice } = await request.json();

    const response = await paynowService.initiatePayment({
      reference: `Sponsorship-${tierName}-${Date.now()}`,
      amount: tierPrice,
      email,
      paymentMethod,
      mobileNumber: paymentMethod !== 'web' ? mobileNumber : undefined
    });

    if (!response.success) {
      return NextResponse.json(
        { error: response.error || 'Payment initiation failed' },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}