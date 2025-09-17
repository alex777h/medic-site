import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose, { Schema, models, model } from 'mongoose';

const NewsSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  text: { type: String, required: true },
});

const News = models.News || model('News', NewsSchema);

export async function GET() {
  await dbConnect();
  const news = await News.find().sort({ date: -1 });
  return NextResponse.json(news);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const newsItem = await News.create(data);
  return NextResponse.json(newsItem, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { id } = await req.json();
  await News.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
