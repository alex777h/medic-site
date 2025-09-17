export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    if (url.searchParams.get("all")) {
      const feedbacks = await Feedback.find().sort({ createdAt: -1 });
      return NextResponse.json({ feedbacks });
    }
    return NextResponse.json({ error: "Недостаточно параметров" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Нет id" }, { status: 400 });
    await Feedback.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/medic-site";

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

async function dbConnect() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, message } = await req.json();
    const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
    }
    const feedback = await Feedback.create({ name, email, message });
    return NextResponse.json({ success: true, feedback });
  } catch (e) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
