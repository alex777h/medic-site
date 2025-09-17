"use client";


import { useEffect, useState } from "react";
import HeaderContacts from "../components/HeaderContacts";

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  text: string;
}

export default function News() {
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
          <a href="/news" className="hover:underline font-medium">Новости</a>
        </div>
      </nav>
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-6">Новости</h2>
        <div className="max-w-2xl w-full space-y-6">
          {news.length === 0 && <div className="text-gray-400">Нет новостей</div>}
          {news.map((item) => (
            <div className="border rounded p-4 shadow bg-white" key={item._id}>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: item.text }} />
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
          ))}
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
