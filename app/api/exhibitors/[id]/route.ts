import { NextRequest, NextResponse } from 'next/server';
import Exhibitor from '@/models/exhibitor';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/connectToDB';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const exhibitor = await Exhibitor.findById(params.id).populate('userId');
    
    if (!exhibitor) {
      return NextResponse.json(
        { error: "Exhibitor not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(exhibitor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch exhibitor" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  
  try {
    const exhibitor = await Exhibitor.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!exhibitor) {
      return NextResponse.json(
        { error: "Exhibitor not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(exhibitor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update exhibitor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const exhibitor = await Exhibitor.findByIdAndDelete(params.id);
    
    if (!exhibitor) {
      return NextResponse.json(
        { error: "Exhibitor not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: "Exhibitor deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete exhibitor" },
      { status: 500 }
    );
  }
}