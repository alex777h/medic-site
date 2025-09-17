import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Ambulatory from '@/models/Ambulatory';

export async function GET() {
  await dbConnect();
  let doc = await Ambulatory.findOne();
  if (!doc || !doc.name || !doc.address || !doc.lat || !doc.lng) {
    // Если запись отсутствует или поля пустые, пересоздать с дефолтными значениями
    if (doc) await doc.deleteOne();
    doc = await Ambulatory.create({
      name: 'Амбулатория №1',
      address: 'г. Москва, ул. Примерная, д. 2',
      phone: '+7 (495) 111-22-33',
      lat: '55.7558',
      lng: '37.6176',
      text: 'В нашей амбулатории вы можете пройти профилактические осмотры, получить консультации специалистов, сдать анализы и пройти необходимые процедуры. Мы обеспечиваем индивидуальный подход к каждому пациенту и современное медицинское оборудование.'
    });
  }
  return NextResponse.json({
    name: doc.name,
    address: doc.address,
    phone: doc.phone,
  lat: doc.lat,
  lng: doc.lng,
    text: doc.text,
  });
}
