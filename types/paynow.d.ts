declare module 'paynow' {
    export class Paynow {
      constructor(integrationId: string, integrationKey: string);
  
      resultUrl: string;
      returnUrl: string;
  
      createPayment(reference: string, email: string): Payment;
      send(payment: Payment): Promise<WebInitResponse>;
      sendMobile(
        payment: Payment,
        phone: string,
        method: 'ecocash' | 'onemoney'
      ): Promise<MobileInitResponse>;
      pollTransaction(pollUrl: string): Promise<TransactionStatusResponse>;
    }
  
    interface Payment {
      add(itemName: string, amount: number): void;
    }
  
    interface WebInitResponse {
      success: boolean;
      redirectUrl: string;
      pollUrl: string;
    }
  
    interface MobileInitResponse {
      success: boolean;
      instructions: string;
      pollUrl: string;
    }
  
    interface TransactionStatusResponse {
      paid: boolean;
      amount: number;
      status: string;
      reference: string;
      date: string;
    }
  }
  
  
  interface WebInitResponse {
    success: boolean;
    redirectUrl: string;
    pollUrl: string;
    // Other web-specific properties
  }
  
  interface MobileInitResponse {
    success: boolean;
    instructions: string;
    pollUrl: string;
    // Other mobile-specific properties
  }
  
  type InitResponse = WebInitResponse | MobileInitResponse;