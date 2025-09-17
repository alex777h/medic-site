import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Ambulatory from '@/models/Ambulatory';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, address, phone, lat, lng, text } = await req.json();
  let doc = await Ambulatory.findOne();
  if (!doc) {
  doc = await Ambulatory.create({ name, address, phone, lat, lng, text });
  } else {
    doc.name = name;
    doc.address = address;
    doc.phone = phone;
  doc.lat = lat;
  doc.lng = lng;
    doc.text = text;
    await doc.save();
  }
  return NextResponse.json({ success: true });
}
