import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Doctor from '@/models/Doctor';

export async function GET() {
  await dbConnect();
  const doctors = await Doctor.find();
  return NextResponse.json(doctors);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const doctor = await Doctor.create(data);
  return NextResponse.json(doctor, { status: 201 });
}
