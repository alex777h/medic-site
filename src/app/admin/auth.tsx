"use client";
import { useState } from "react";

const ADMIN_PASSWORD = "admin123"; // Замените на свой пароль



import { useEffect } from "react";

export default function AdminAuth({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthed(localStorage.getItem("admin_auth") === "1");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "1");
      setIsAuthed(true);
      onAuth();
    } else {
      setError("Неверный пароль");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthed(false);
    window.location.reload();
  };

  if (isAuthed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow max-w-xs w-full flex flex-col items-center">
          <div className="mb-4 text-green-700 font-bold">Вы вошли в админ-панель</div>
          <button onClick={handleLogout} className="bg-red-600 text-white rounded p-2 w-full">Выйти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-xs w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Вход в админ-панель</h2>
        <input
          type="password"
          className="border rounded p-2 w-full mb-4"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white rounded p-2 w-full">Войти</button>
      </form>
    </div>
  );
}
