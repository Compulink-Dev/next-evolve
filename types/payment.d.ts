// types/payment.d.ts
export interface Purchase {
    userId: string;
    eventId: string;
    paymentId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
  }