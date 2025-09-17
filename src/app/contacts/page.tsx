
"use client";
import { useEffect, useState } from "react";

interface ContactsData {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<ContactsData | null>(null);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  if (!contacts) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="text-lg text-gray-500 mt-20">Загрузка контактов...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-blue-700 text-white py-4 shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
          <span className="text-2xl font-bold">Медицинский центр "Здоровье"</span>
          <span className="text-sm">| {contacts.address}</span>
          <span className="text-sm">| Тел.: {contacts.phone}</span>
          <span className="text-sm">| Email: {contacts.email}</span>
        </div>
      </header>
      <nav className="w-full bg-blue-100 text-blue-900 py-2 shadow-inner">
        <div className="container mx-auto flex flex-wrap justify-center gap-6 text-base">
          <a href="/" className="hover:underline font-medium">Главная</a>
          <a href="/about" className="hover:underline font-medium">О клинике</a>
          <a href="/ambulatory" className="hover:underline font-medium">Амбулатория</a>
          <a href="/doctors" className="hover:underline font-medium">Врачи</a>
          <a href="/contacts" className="hover:underline font-medium">Контакты</a>
          <a href="/faq" className="hover:underline font-medium">FAQ</a>
        </div>
      </nav>
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Контакты</h2>
        <div className="max-w-xl text-center text-lg">
          <p>Адрес: {contacts.address}</p>
          <p>Телефон: {contacts.phone}</p>
          <p>Email: {contacts.email}</p>
          <p>Часы работы: {contacts.hours}</p>
        </div>
      </main>
      <footer className="w-full bg-gray-100 text-gray-600 py-4 mt-auto shadow-inner">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Медицинский центр "Здоровье". Все права защищены.
        </div>
      </footer>
    </div>
  );
}
