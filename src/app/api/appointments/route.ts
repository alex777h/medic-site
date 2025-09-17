import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function GET() {
  await dbConnect();
  const appointments = await Appointment.find();
  return NextResponse.json(appointments);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const appointment = await Appointment.create(data);
  return NextResponse.json(appointment, { status: 201 });
}
