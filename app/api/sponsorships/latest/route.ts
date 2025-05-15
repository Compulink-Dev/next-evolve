// app/api/sponsorships/latest/route.ts

import { connectDB } from '@/lib/connectToDB';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/options';
import Sponsorship from '@/models/sponsorship';

export async function GET() {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sponsorship = await Sponsorship.findOne({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    if (!sponsorship) {
      return NextResponse.json({ error: 'No sponsorship found' }, { status: 404 });
    }

    return NextResponse.json(sponsorship);
  } catch (error: any) {
    console.error('Error fetching latest sponsorship:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
