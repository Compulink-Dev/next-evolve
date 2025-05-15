import { NextRequest, NextResponse } from 'next/server';
import Exhibitor from '@/models/exhibitor';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/connectToDB';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { boothNumber, paymentProof, additionalInfo } = body;

  const existing = await Exhibitor.findOne({ boothNumber });
  if (existing) return NextResponse.json({ message: 'Booth taken' }, { status: 409 });

  const exhibitor = await Exhibitor.create({
    userId: session.user.id,
    boothNumber,
    paymentProof,
    additionalInfo,
  });

  return NextResponse.json(exhibitor);
}
