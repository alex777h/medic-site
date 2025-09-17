"use client";
import { useState } from "react";

const defaultFaq = [
  {
    q: "Как записаться на прием?",
    a: "Вы можете позвонить по телефону или воспользоваться формой на сайте (если она доступна).",
  },
  {
    q: "Какие документы нужны для приема?",
    a: "Паспорт и полис ОМС/ДМС (если есть).",
  },
  {
    q: "Работаете ли вы по выходным?",
    a: "Да, мы работаем и в выходные дни. Подробное расписание указано в разделе 'Контакты'.",
  },
  {
    q: "Можно ли получить консультацию онлайн?",
    a: "Да, мы предоставляем онлайн-консультации по предварительной записи.",
  },
];

export default function AdminFaq() {
  const [faq, setFaq] = useState(defaultFaq);
  const [form, setForm] = useState({ q: "", a: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.q || !form.a) return;
    setFaq([{ ...form }, ...faq]);
    setForm({ q: "", a: "" });
  };

  const handleDelete = (idx: number) => {
    setFaq(faq.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-blue-700 text-white py-4 shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
          <span className="text-2xl font-bold">Админ-панель: FAQ</span>
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
        <h2 className="text-2xl font-bold mb-6">Редактирование FAQ</h2>
        <form onSubmit={handleAdd} className="mb-8 w-full max-w-lg grid gap-4 bg-white p-4 rounded shadow">
          <input name="q" value={form.q} onChange={handleChange} placeholder="Вопрос" className="border rounded p-2" />
          <textarea name="a" value={form.a} onChange={handleChange} placeholder="Ответ" className="border rounded p-2" />
          <button type="submit" className="bg-blue-600 text-white rounded p-2">Добавить вопрос</button>
        </form>
        <div className="w-full max-w-lg space-y-4">
          {faq.map((item, idx) => (
            <div key={idx} className="border rounded p-4 shadow bg-white relative">
              <button onClick={() => handleDelete(idx)} className="absolute top-2 right-2 text-red-500">✕</button>
              <div className="font-semibold text-lg mb-1">{item.q}</div>
              <div className="text-gray-700 text-sm mb-2">{item.a}</div>
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
