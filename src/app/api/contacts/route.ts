import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET() {
  await dbConnect();
  let contact = await Contact.findOne();
  if (!contact) {
    contact = await Contact.create({
      address: 'г. Москва, ул. Примерная, д. 1',
      phone: '+7 (495) 123-45-67',
      email: 'info@clinic.ru',
      hours: 'Пн-Пт 8:00-20:00, Сб-Вс 9:00-18:00',
    });
  }
  return NextResponse.json(contact);
}
