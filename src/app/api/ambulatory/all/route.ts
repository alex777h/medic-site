import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Ambulatory from '@/models/Ambulatory';

export async function GET() {
  await dbConnect();
  const docs = await Ambulatory.find();
  return NextResponse.json(docs);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, address, phone, lat, lng, text } = await req.json();
  const doc = await Ambulatory.create({ name, address, phone, lat, lng, text });
  return NextResponse.json(doc);
}
