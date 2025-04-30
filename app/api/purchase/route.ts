// app/api/purchase/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderPurchaseConfirmation, renderInvoiceTemplate } from '@/utils/email-templates';
import { auth } from '@/lib/auth';

const resend = new Resend(process.env.RESEND_API_KEY);

interface PurchaseData {
  phone: string;
  company?: string;
  address: string;
  paymentMethod: string;
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { eventId, ...purchaseData }: { eventId: string } & PurchaseData = await request.json();

    // Combine session data with form data
    const completePurchaseData = {
      name: session.user.name || '',
      email: session.user.email || '',
      ...purchaseData
    };

    // Generate invoice
    const invoiceNumber = `INV-${Date.now()}`;
    const invoiceDate = new Date().toISOString().split('T')[0];
    const amount = 99.00;

    // Render emails
    const emailHtml = await renderPurchaseConfirmation({
      name: completePurchaseData.name,
      invoiceNumber,
      amount
    });

    const invoiceHtml = await renderInvoiceTemplate({
      invoiceNumber,
      date: invoiceDate,
      customerName: completePurchaseData.name,
      customerEmail: completePurchaseData.email,
      items: [{ description: `Event Access (ID: ${eventId})`, amount }],
      total: amount
    });

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'no-reply@yourdomain.com',
      to: completePurchaseData.email,
      subject: 'Your Purchase Confirmation',
      //@ts-ignore
      html: emailHtml,
      attachments: [{
        filename: `invoice_${invoiceNumber}.html`,
        //@ts-ignore
        content: Buffer.from(invoiceHtml).toString('base64'),
      }],
    });

    if (error) throw error;

    return NextResponse.json({ 
      success: true,
      invoiceNumber,
      emailId: data?.id
    });

  } catch (error) {
    console.error('Purchase processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process purchase' },
      { status: 500 }
    );
  }
}