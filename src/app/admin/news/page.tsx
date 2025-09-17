"use client";

import { useEffect, useState } from "react";

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  text: string;
}


export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [form, setForm] = useState({ title: "", date: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = () => {
    setLoading(true);
    fetch("/api/admin/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);


  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value, date: getCurrentDateTime() });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.date || !form.text) return;
    const res = await fetch("/api/admin/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: "", date: "", text: "" });
      fetchNews();
    } else {
      setError("Ошибка добавления новости");
    }
  };

  const handleDelete = async (id: string) => {
    setError("");
    const res = await fetch("/api/admin/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchNews();
    } else {
      setError("Ошибка удаления новости");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-blue-700 text-white py-4 shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
          <span className="text-2xl font-bold">Админ-панель: Новости</span>
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
        <h2 className="text-2xl font-bold mb-6">Редактирование новостей</h2>
        <form onSubmit={handleAdd} className="mb-8 w-full max-w-lg grid gap-4 bg-white p-4 rounded shadow">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Заголовок" className="border rounded p-2" />
          <input name="date" value={form.date} onChange={handleChange} placeholder="Дата (например, 17 сентября 2025)" className="border rounded p-2" />
          <textarea name="text" value={form.text} onChange={handleChange} placeholder="Текст новости (можно использовать HTML, например: <img src='url' alt='описание'>)" className="border rounded p-2" />
          <div className="text-xs text-gray-500">Можно вставлять HTML, например: {'<img src="https://site.ru/image.jpg" alt="описание">'}</div>
          <button type="submit" className="bg-blue-600 text-white rounded p-2">Добавить новость</button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
        <div className="w-full max-w-lg space-y-4">
          {loading ? (
            <div className="text-gray-400">Загрузка...</div>
          ) : news.length === 0 ? (
            <div className="text-gray-400">Нет новостей</div>
          ) : (
            news.map((item) => (
              <div key={item._id} className="border rounded p-4 shadow bg-white relative">
                <button onClick={() => handleDelete(item._id)} className="absolute top-2 right-2 text-red-500">✕</button>
                <div className="font-semibold text-lg mb-1">{item.title}</div>
                <div className="text-xs text-gray-400 mb-1">{item.date}</div>
                <div className="text-gray-700 text-sm mb-2">{item.text}</div>
              </div>
            ))
          )}
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
