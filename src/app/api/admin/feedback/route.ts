import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Feedback from '../../../../models/Feedback';

export async function GET() {
  await dbConnect();
  const feedbacks = await Feedback.find().sort({ date: -1 });
  return NextResponse.json(feedbacks);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, text, photoUrl } = await req.json();
  if (!name || !text) {
    return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 });
  }
  const feedback = await Feedback.create({ name, text, photoUrl });
  return NextResponse.json(feedback);
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Нет id' }, { status: 400 });
  await Feedback.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
