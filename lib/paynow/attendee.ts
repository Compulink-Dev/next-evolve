import { Paynow } from "paynow";

interface PaymentResponse {
  success: boolean;
  redirectUrl?: string;
  instructions?: string;
  pollUrl?: string;
  error?: string;
  rawResponse?: any; // For debugging
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
      // Validate inputs
      if (!options.reference || !options.email || !options.amount) {
        throw new Error('Missing required payment options');
      }

      // Verify environment variables
      if (!process.env.PAYNOW_INTEGRATION_ID || !process.env.PAYNOW_INTEGRATION_KEY) {
        throw new Error('Paynow credentials not configured');
      }

      // Validate base URL
      if (!process.env.NEXT_PUBLIC_BASE_URL) {
        console.warn('NEXT_PUBLIC_BASE_URL not set, using fallback');
      }

      // Initialize Paynow
      const paynow = new Paynow(
        process.env.PAYNOW_INTEGRATION_ID,
        process.env.PAYNOW_INTEGRATION_KEY
      );

      // Configure URLs with fallback
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      paynow.resultUrl = `${baseUrl}/api/paynow/webhook`;
      paynow.returnUrl = `${baseUrl}/attendee/success`;

       // Handle test mode email requirement
       const isTestMode = !process.env.PAYNOW_PRODUCTION_MODE || 
       process.env.NODE_ENV === 'development';

const paymentEmail = isTestMode 
? process.env.PAYNOW_MERCHANT_EMAIL || 'digitalpayments@compulink.co.zw'
: options.email;

      // Create payment
      const payment = paynow.createPayment(options.reference, paymentEmail);
      payment.add(`Sponsorship - ${options.reference}`, options.amount);

      let response: PaymentResponse = { success: false };

      // Handle different payment methods
      if (options.paymentMethod === 'web') {
        const webResponse = await paynow.send(payment);
        console.log('Web payment response:', webResponse);
        
        if (!webResponse) {
          throw new Error('No response received from Paynow');
        }

        if (webResponse.success) {
          response = {
            success: true,
            redirectUrl: webResponse.redirectUrl,
            pollUrl: webResponse.pollUrl,
            rawResponse: webResponse
          };
        } else {
          throw new Error(webResponse.pollUrl || 'Web payment failed');
        }
      } else {
        // Mobile payment
        if (!options.mobileNumber) {
          throw new Error('Mobile number is required for mobile payments');
        }

        const mobileResponse = await paynow.sendMobile(
          payment, 
          options.mobileNumber, 
          options.paymentMethod
        );
        console.log('Mobile payment response:', mobileResponse);

        if (!mobileResponse) {
          throw new Error('No response received from Paynow');
        }

        if (mobileResponse.success) {
          response = {
            success: true,
            instructions: mobileResponse.instructions,
            pollUrl: mobileResponse.pollUrl,
            rawResponse: mobileResponse
          };
        } else {
          throw new Error(mobileResponse.instructions || 'Mobile payment failed');
        }
      }

      return response;

    } catch (error: any) {
      console.error('Detailed Paynow initiation error:', {
        error: error.message,
        stack: error.stack,
        options
      });
      
      return {
        success: false,
        error: error.message || 'Payment initiation failed',
        rawResponse: error.response?.data || error
      };
    }
  },

  async checkPaymentStatus(pollUrl: string): Promise<PaymentResponse> {
    try {
      if (!pollUrl) {
        throw new Error('Missing pollUrl');
      }

      if (!process.env.PAYNOW_INTEGRATION_ID || !process.env.PAYNOW_INTEGRATION_KEY) {
        throw new Error('Paynow credentials not configured');
      }

      const paynow = new Paynow(
        process.env.PAYNOW_INTEGRATION_ID,
        process.env.PAYNOW_INTEGRATION_KEY
      );

      const status = await paynow.pollTransaction(pollUrl);
      console.log('Payment status:', status);

      return {
        success: status.paid,
        pollUrl,
        rawResponse: status
      };
    } catch (error: any) {
      console.error('Detailed Paynow status check error:', {
        error: error.message,
        stack: error.stack,
        pollUrl
      });
      
      return {
        success: false,
        error: error.message || 'Payment status check failed',
        rawResponse: error.response?.data || error
      };
    }
  }
};