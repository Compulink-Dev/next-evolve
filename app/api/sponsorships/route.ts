import { connectDB } from '@/lib/connectToDB';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import path from 'path';
import { authOptions } from '../auth/[...nextauth]/options';
import Sponsorship from '@/models/sponsorship';
import { promises as fs } from 'fs'; // Use promises API

export async function POST(req: Request) {
  await connectDB();
  
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const tier = formData.get('tier') as string;
    const amount = formData.get('amount') as string;
    const additionalInfo = formData.get('additionalInfo') as string;
    const paymentProofFile = formData.get('paymentProof') as File | null;
    const userId = formData.get('userId') as string;

    // Handle file upload
    let paymentProofPath = '';
    if (paymentProofFile) {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        await fs.access(uploadsDir);
      } catch {
        await fs.mkdir(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const ext = paymentProofFile.name.split('.').pop();
      const filename = `payment-proof-${userId}-${timestamp}.${ext}`;
      paymentProofPath = path.join('uploads', filename);

      // Write file to public/uploads
      const fileBuffer = await paymentProofFile.arrayBuffer();
      await fs.writeFile(
        path.join(process.cwd(), 'public', paymentProofPath),
        //@ts-ignore
        Buffer.from(fileBuffer)
      );
    }

    const sponsorship = new Sponsorship({
      userId,
      tier,
      amount: parseInt(amount),
      additionalInfo,
      paymentProof: paymentProofPath || undefined, // Set to undefined if empty
      status: 'pending',
    });

    await sponsorship.save();

    return NextResponse.json({ 
      message: 'Sponsorship application submitted successfully',
      paymentProofUrl: paymentProofPath ? `/uploads/${paymentProofPath}` : null
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit sponsorship application' },
      { status: 500 }
    );
  }
}