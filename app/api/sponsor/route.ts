import { connectDB } from '@/lib/connectToDB';
import Sponsor from '@/models/sponsor';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const sponsors = await Sponsor.find();
  return NextResponse.json(sponsors);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const sponsor = await Sponsor.create(body);
  return NextResponse.json(sponsor);
}
