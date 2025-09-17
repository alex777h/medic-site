"use client";

import { useState, useEffect } from "react";


type ContactsData = {
  address: string;
  phone: string;
  email: string;
  hours: string;
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactsData | null>(null);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) throw new Error("Ошибка загрузки данных");
      const data = await res.json();
      setContacts(data);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Ошибка");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!contacts) return;
    setContacts({ ...contacts, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!contacts) return;
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacts),
      });
      if (!res.ok) throw new Error("Ошибка сохранения");
      await fetchContacts();
      setEdit(false);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Ошибка");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-blue-700 text-white py-4 shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
          <span className="text-2xl font-bold">Админ-панель: Контакты</span>
        </div>
      </header>
      <nav className="w-full bg-blue-100 text-blue-900 py-2 shadow-inner">
        <div className="container mx-auto flex flex-wrap justify-center gap-6 text-base">
          <a href="/admin" className="hover:underline font-medium">Главная</a>
          <a href="/admin/main" className="hover:underline font-medium">Главная страница</a>
          <a href="/admin/about" className="hover:underline font-medium">О клинике</a>
          <a href="/admin/doctors" className="hover:underline font-medium">Врачи</a>
          <a href="/admin/contacts" className="hover:underline font-medium">Контакты</a>
          <a href="/admin/faq" className="hover:underline font-medium">FAQ</a>
          <a href="/admin/news" className="hover:underline font-medium">Новости</a>
        </div>
      </nav>
      <main className="flex flex-1 flex-col items-center p-8">
        <h2 className="text-2xl font-bold mb-6">Редактирование контактов</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!contacts ? (
          <div className="w-full max-w-xl grid gap-4 bg-white p-4 rounded shadow text-center text-gray-400">Загрузка...</div>
        ) : edit ? (
          <div className="w-full max-w-xl grid gap-4 bg-white p-4 rounded shadow">
            <input name="address" value={contacts.address} onChange={handleChange} className="border rounded p-2" placeholder="Адрес" />
            <input name="phone" value={contacts.phone} onChange={handleChange} className="border rounded p-2" placeholder="Телефон" />
            <input name="email" value={contacts.email} onChange={handleChange} className="border rounded p-2" placeholder="Email" />
            <input name="hours" value={contacts.hours} onChange={handleChange} className="border rounded p-2" placeholder="Часы работы" />
            <button onClick={handleSave} className="bg-blue-600 text-white rounded p-2">Сохранить</button>
          </div>
        ) : (
          <div className="w-full max-w-xl grid gap-4 bg-white p-4 rounded shadow">
            <p>Адрес: {contacts.address}</p>
            <p>Телефон: {contacts.phone}</p>
            <p>Email: {contacts.email}</p>
            <p>Часы работы: {contacts.hours}</p>
            <button onClick={() => setEdit(true)} className="bg-blue-600 text-white rounded p-2">Редактировать</button>
          </div>
        )}
      </main>
      <footer className="w-full bg-gray-100 text-gray-600 py-4 mt-auto shadow-inner">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Медицинский центр "Здоровье". Все права защищены.
        </div>
      </footer>
    </div>
  );
}
