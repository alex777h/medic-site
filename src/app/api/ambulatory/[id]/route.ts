export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  await Ambulatory.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Ambulatory from '@/models/Ambulatory';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const { name, address, phone, lat, lng, text } = await req.json();
  const doc = await Ambulatory.findByIdAndUpdate(id, { name, address, phone, lat, lng, text }, { new: true });
  return NextResponse.json(doc);
}
