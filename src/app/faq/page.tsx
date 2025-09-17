
"use client";
import { useEffect, useState } from "react";
import HeaderContacts from "../components/HeaderContacts";

interface FaqItem {
  _id: string;
  q: string;
  a: string;
}

export default function FAQ() {
  const [questions, setQuestions] = useState<FaqItem[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/faq")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
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
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-6">Часто задаваемые вопросы</h2>
        <div className="max-w-2xl w-full space-y-4">
          {questions.length === 0 && <div className="text-gray-400">Нет вопросов</div>}
          {questions.map((item, idx) => (
            <div key={item._id} className="border rounded shadow">
              <button
                className="w-full text-left px-4 py-3 font-semibold text-lg flex justify-between items-center focus:outline-none"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
              >
                {item.q}
                <span className="ml-2">{open === idx ? "-" : "+"}</span>
              </button>
              {open === idx && (
                <div className="px-4 pb-4 text-gray-700 animate-fade-in">
                  {item.a}
                </div>
              )}
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
