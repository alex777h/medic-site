import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose, { Schema, models, model } from 'mongoose';

const FaqSchema = new Schema({
  q: { type: String, required: true },
  a: { type: String, required: true },
});

const Faq = models.Faq || model('Faq', FaqSchema);

export async function GET() {
  await dbConnect();
  const faq = await Faq.find();
  return NextResponse.json(faq);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const faqItem = await Faq.create(data);
  return NextResponse.json(faqItem, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { id } = await req.json();
  await Faq.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
