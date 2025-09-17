"use client";
import { useState } from "react";

const defaultText = `Добро пожаловать на сайт нашего медицинского учреждения!`;

export default function AdminMain() {
  const [text, setText] = useState<string>(defaultText);
  const [edit, setEdit] = useState(false);

  const handleSave = () => {
    setEdit(false);
    // Здесь можно добавить сохранение в БД или файл
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-blue-700 text-white py-4 shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
          <span className="text-2xl font-bold">Админ-панель: Главная страница</span>
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
        <h2 className="text-2xl font-bold mb-6">Редактирование главной страницы</h2>
        {edit ? (
          <div className="w-full max-w-xl grid gap-4 bg-white p-4 rounded shadow">
            <textarea
              className="border rounded p-2 min-h-[80px]"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button onClick={handleSave} className="bg-blue-600 text-white rounded p-2">Сохранить</button>
          </div>
        ) : (
          <div className="w-full max-w-xl grid gap-4 bg-white p-4 rounded shadow">
            <p className="text-lg">{text}</p>
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
