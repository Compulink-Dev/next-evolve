import { NextResponse } from 'next/server';
import { Paynow } from 'paynow';

// Type definitions
interface PaymentResponse {
  success: boolean;
  redirectUrl?: string;
  instructions?: string;
  pollUrl?: string;
  error?: string;
}

export async function POST(request: Request) {
  try {
    // Verify environment variables
    if (!process.env.PAYNOW_INTEGRATION_ID || !process.env.PAYNOW_INTEGRATION_KEY) {
      throw new Error('Paynow credentials not configured');
    }

    const { paymentMethod, mobileNumber, email, tierName, tierPrice } = await request.json();

    // Initialize Paynow
    const paynow = new Paynow(
      process.env.PAYNOW_INTEGRATION_ID,
      process.env.PAYNOW_INTEGRATION_KEY
    );

    // Configure URLs
    paynow.resultUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/paynow/webhook`;
    paynow.returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sponsor/success`;

    // Create payment
    const payment = paynow.createPayment(`Sponsorship-${tierName}-${Date.now()}`, email);
    payment.add(`${tierName} Sponsorship`, tierPrice);

    let response: PaymentResponse = { success: false };

    // Process payment based on method
    if (paymentMethod === 'web') {
      const webResponse = await paynow.send(payment);
      if (webResponse.success) {
        response = {
          success: true,
          redirectUrl: webResponse.redirectUrl,
          pollUrl: webResponse.pollUrl
        };
      }
    } else if (paymentMethod === 'ecocash' || paymentMethod === 'onemoney') {
      if (!mobileNumber) {
        throw new Error('Mobile number is required');
      }
      const mobileResponse = await paynow.sendMobile(payment, mobileNumber, paymentMethod);
      if (mobileResponse.success) {
        response = {
          success: true,
          instructions: mobileResponse.instructions,
          pollUrl: mobileResponse.pollUrl
        };
      }
    }

    if (!response.success) {
      return NextResponse.json(
        { error: 'Failed to initiate payment' },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Paynow error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}