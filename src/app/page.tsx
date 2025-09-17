

"use client";
import { useEffect, useState } from "react";

import HeaderContacts from "./components/HeaderContacts";


interface NewsItem {
  _id: string;
  title: string;
  date: string;
  text: string;
}

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  description?: string;
}


export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/news")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-blue-700 text-white py-4 shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
          <span className="text-2xl font-bold">Медицинский центр "Здоровье"</span>
          <HeaderContacts />
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
      <main className="flex flex-1 flex-row items-start justify-center p-8 gap-8 w-full max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-lg mb-8 mt-4">Добро пожаловать на сайт нашего медицинского учреждения!</p>
        </div>
        <aside className="w-full max-w-xs bg-white border rounded shadow p-4 mt-4">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Новости</h3>
          {news.length === 0 && <div className="text-gray-400">Нет новостей</div>}
          {news.map((item) => (
            <div className="mb-3" key={item._id}>
              <div className="font-semibold">{item.title}</div>
              <div className="text-xs text-gray-400 mb-1">{item.date}</div>
              <div className="text-gray-700 text-sm mb-2">{item.text}</div>
            </div>
          ))}
          <a href="/news" className="block text-blue-600 underline text-right mt-2">Все новости</a>
        </aside>
      </main>
      <footer className="w-full bg-gray-100 text-gray-600 py-4 mt-auto shadow-inner">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Медицинский центр "Здоровье". Все права защищены.
        </div>
      </footer>
    </div>
  );
}
