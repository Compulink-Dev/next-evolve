import { connectDB } from '@/lib/connectToDB';
import Sponsor from '@/models/sponsor';
import { NextResponse } from 'next/server';


export async function GET(req: Request, { params }: any) {
  await connectDB();
  const sponsor = await Sponsor.findById(params.id);
  return NextResponse.json(sponsor);
}

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const body = await req.json();
  const updated = await Sponsor.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await connectDB();
  await Sponsor.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}
