// app/api/check-access/route.ts
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { checkUserAccess } from '@/lib/payments';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  // Extract eventId from query parameters
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('eventId');

  if (!session || !eventId) {
    return NextResponse.json({ hasAccess: false }, { status: 401 });
  }

  try {
    const hasAccess = await checkUserAccess(session.user.id, eventId);
    return NextResponse.json({ hasAccess });
  } catch (error) {
    console.error('Error checking access:', error);
    return NextResponse.json(
      { error: 'Failed to check access' },
      { status: 500 }
    );
  }
}