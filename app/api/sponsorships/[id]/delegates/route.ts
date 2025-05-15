import { connectDB } from '@/lib/connectToDB';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Sponsorship from '@/models/sponsorship';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { delegates } = await req.json();

    const sponsorship = await Sponsorship.findByIdAndUpdate(
      params.id,
      { delegates },
      { new: true }
    );

    if (!sponsorship) {
      return NextResponse.json({ error: 'Sponsorship not found' }, { status: 404 });
    }

    return NextResponse.json(sponsorship);
  } catch (error: any) {
    console.error('Error updating delegates:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}