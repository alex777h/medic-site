"use client";

import { useEffect, useState } from "react";
import HeaderContacts from "../components/HeaderContacts";
// Кнопка "Вверх"
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 z-50 p-0.5 rounded-full shadow-lg bg-gradient-to-br from-cyan-500 to-blue-700 hover:from-blue-700 hover:to-cyan-400 transition-all duration-300 border-2 border-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} group`}
      aria-label="Наверх"
    >
      <span className="flex items-center justify-center w-12 h-12">
        <svg className="w-7 h-7 text-white group-hover:text-cyan-100 transition" fill="none" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </button>
  );
}

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTopButton />
      <header className="w-full bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 text-white py-6 shadow-lg relative z-10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 shadow-md mr-2">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 32 32' className="w-8 h-8 text-white"><rect width="32" height="32" rx="16" fill="#2563eb"/><path d="M16 8v16M8 16h16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </span>
            <span className="text-3xl font-extrabold tracking-tight drop-shadow-lg">Медицинский центр "Здоровье"</span>
          </div>
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
        <h2 className="text-3xl font-bold mb-4">О клинике</h2>
        <p className="max-w-xl text-center text-lg">
          Медицинский центр "Здоровье" — современное учреждение, предоставляющее широкий спектр медицинских услуг для взрослых и детей. Наши специалисты имеют высокую квалификацию и большой опыт работы. Мы заботимся о вашем здоровье и комфорте!
        </p>
      </main>
      <footer className="w-full bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 text-white py-6 mt-auto shadow-inner border-t border-blue-800/30">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 32 32' className="w-6 h-6 text-cyan-200"><rect width="32" height="32" rx="16" fill="#2563eb"/><path d="M16 8v16M8 16h16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
              <span className="font-semibold">Медицинский центр "Здоровье"</span>
            </div>
            <div className="flex items-center gap-3 text-cyan-100/80">
              <svg className="w-5 h-5 text-cyan-200" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Пн–Пт: 8:00–20:00, Сб: 9:00–15:00</span>
              <span className="hidden md:inline">|</span>
              <span>&copy; {new Date().getFullYear()} Все права защищены.</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
