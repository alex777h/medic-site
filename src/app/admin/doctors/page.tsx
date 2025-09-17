"use client";
import { useEffect, useState } from "react";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  description?: string;
}

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState({ name: "", specialty: "", phone: "", email: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDoctors = () => {
    setLoading(true);
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.specialty || !form.phone || !form.email) return;
    const res = await fetch("/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ name: "", specialty: "", phone: "", email: "", description: "" });
      fetchDoctors();
    } else {
      setError("Ошибка добавления врача");
    }
  };

  const handleDelete = async (id: string) => {
    setError("");
    const res = await fetch(`/api/doctors/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchDoctors();
    } else {
      setError("Ошибка удаления врача");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-blue-700 text-white py-4 shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
          <span className="text-2xl font-bold">Админ-панель: Врачи</span>
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
        <h2 className="text-2xl font-bold mb-6">Редактирование врачей</h2>
        <form onSubmit={handleAdd} className="mb-8 w-full max-w-lg grid gap-4 bg-white p-4 rounded shadow">
          <input name="name" value={form.name} onChange={handleChange} placeholder="ФИО" className="border rounded p-2" />
          <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="Специальность" className="border rounded p-2" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Телефон" className="border rounded p-2" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded p-2" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" className="border rounded p-2" />
          <button type="submit" className="bg-blue-600 text-white rounded p-2">Добавить врача</button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
        <div className="w-full max-w-lg space-y-4">
          {loading ? (
            <div className="text-gray-400">Загрузка...</div>
          ) : doctors.length === 0 ? (
            <div className="text-gray-400">Нет врачей</div>
          ) : (
            doctors.map((doc) => (
              <div key={doc._id} className="border rounded p-4 shadow bg-white relative">
                <button onClick={() => handleDelete(doc._id)} className="absolute top-2 right-2 text-red-500">✕</button>
                <div className="font-semibold text-lg mb-1">{doc.name}</div>
                <div className="text-gray-700 text-sm mb-1">{doc.specialty}</div>
                <div className="text-gray-700 text-sm mb-1">Телефон: {doc.phone}</div>
                <div className="text-gray-700 text-sm mb-1">Email: {doc.email}</div>
                {doc.description && <div className="text-gray-700 text-sm mb-1">{doc.description}</div>}
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
