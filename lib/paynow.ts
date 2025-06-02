import { Paynow } from "paynow";

interface PaymentResponse {
  success: boolean;
  redirectUrl?: string;
  instructions?: string;
  pollUrl?: string;
  error?: string;
}

interface PaymentOptions {
  reference: string;
  amount: number;
  email: string;
  paymentMethod: "web" | "ecocash" | "onemoney";
  mobileNumber?: string;
}

export const paynowService = {
  async initiatePayment(options: PaymentOptions): Promise<PaymentResponse> {
    try {
      // Verify environment variables
      if (!process.env.PAYNOW_INTEGRATION_ID || !process.env.PAYNOW_INTEGRATION_KEY) {
        throw new Error('Paynow credentials not configured');
      }

      // Initialize Paynow with just the required credentials
      const paynow = new Paynow(
        process.env.PAYNOW_INTEGRATION_ID,
        process.env.PAYNOW_INTEGRATION_KEY
      );

      // Set the URLs separately
      paynow.resultUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/paynow/webhook`;
      paynow.returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sponsor/success`;

      const payment = paynow.createPayment(options.reference, options.email);
      payment.add(`Sponsorship - ${options.reference}`, options.amount);

      let response: PaymentResponse = { success: false };

      if (options.paymentMethod === 'web') {
        const webResponse = await paynow.send(payment);
        if (webResponse.success) {
          response = {
            success: true,
            redirectUrl: webResponse.redirectUrl,
            pollUrl: webResponse.pollUrl
          };
        }
      } else {
        if (!options.mobileNumber) {
          throw new Error('Mobile number is required for mobile payments');
        }
        const mobileResponse = await paynow.sendMobile(
          payment, 
          options.mobileNumber, 
          options.paymentMethod
        );
        if (mobileResponse.success) {
          response = {
            success: true,
            instructions: mobileResponse.instructions,
            pollUrl: mobileResponse.pollUrl
          };
        }
      }

      if (!response.success) {
        throw new Error('Failed to initiate payment');
      }

      return response;
    } catch (error: any) {
      console.error('Paynow initiation error:', error);
      return {
        success: false,
        error: error.message || 'Payment initiation failed'
      };
    }
  },

  async checkPaymentStatus(pollUrl: string): Promise<PaymentResponse> {
    try {
      if (!process.env.PAYNOW_INTEGRATION_ID || !process.env.PAYNOW_INTEGRATION_KEY) {
        throw new Error('Paynow credentials not configured');
      }

      const paynow = new Paynow(
        process.env.PAYNOW_INTEGRATION_ID,
        process.env.PAYNOW_INTEGRATION_KEY
      );

      const status = await paynow.pollTransaction(pollUrl);

      return {
        success: status.paid,
        pollUrl
      };
    } catch (error: any) {
      console.error('Paynow status check error:', error);
      return {
        success: false,
        error: error.message || 'Payment status check failed'
      };
    }
  }
};