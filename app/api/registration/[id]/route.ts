// app/api/registration/[id]/route.ts
import { NextResponse } from 'next/server';
import Registration from '@/models/registration';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import { connectDB } from '@/lib/connectToDB';

// GET single registration
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const registration = await Registration.findById(params.id);
    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }
    
    // Only allow admin or the owner to access
    if (session.user.role !== 'admin' && registration.email !== session.user.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(registration);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registration' },
      { status: 500 }
    );
  }
}

// PUT update registration
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const registration = await Registration.findById(params.id);
    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }
    
    // Only allow admin or the owner to update
    if (session.user.role !== 'admin' && registration.email !== session.user.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const updatedRegistration = await Registration.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    
    return NextResponse.json(updatedRegistration);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    );
  }
}

// DELETE registration (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  
  const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await Registration.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Registration deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete registration' },
      { status: 500 }
    );
  }
}