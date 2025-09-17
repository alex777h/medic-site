"use client";
import { useEffect, useState } from "react";
import HeaderContacts from "../../components/HeaderContacts";

interface AmbulatoryData {
  _id?: string;
  name: string;
  address: string;
  phone: string;
  lat: string;
  lng: string;
  text: string;
}

export default function Ambulatories() {
  const [list, setList] = useState<AmbulatoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<AmbulatoryData>({
    name: "",
    address: "",
    phone: "",
    lat: "",
    lng: "",
    text: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/ambulatory/all")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setLoading(false);
      });
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (item: AmbulatoryData) => {
    setForm(item);
    setEditId(item._id || null);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm('Удалить амбулаторию?')) return;
    const res = await fetch(`/api/ambulatory/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSuccess('Удалено!');
      setForm({ name: "", address: "", phone: "", lat: "", lng: "", text: "" });
      setEditId(null);
    } else {
      setError('Ошибка удаления');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    let url = "/api/ambulatory/all";
    let method = "POST";
    let body = { ...form };
    if (editId) {
      url = `/api/ambulatory/${editId}`;
      method = "PUT";
    }
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setSuccess(editId ? "Изменено!" : "Добавлено!");
      setForm({ name: "", address: "", phone: "", lat: "", lng: "", text: "" });
      setEditId(null);
    } else {
      setError("Ошибка сохранения");
    }
  };
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
          <a href="/admin" className="hover:underline font-medium">Главная</a>
          <a href="/admin/main" className="hover:underline font-medium">Главная страница</a>
          <a href="/admin/about" className="hover:underline font-medium">О клинике</a>
          <a href="/admin/ambulatory/all" className="hover:underline font-medium">Амбулатории</a>
          <a href="/admin/doctors" className="hover:underline font-medium">Врачи</a>
          <a href="/admin/contacts" className="hover:underline font-medium">Контакты</a>
          <a href="/admin/faq" className="hover:underline font-medium">FAQ</a>
          <a href="/admin/news" className="hover:underline font-medium">Новости</a>
        </div>
      </nav>
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Амбулатории</h2>
        {loading ? (
          <div className="text-gray-500">Загрузка...</div>
        ) : (
          <div className="w-full">
            <form onSubmit={handleSubmit} className="max-w-xl w-full mb-8 space-y-2">
              <input className="w-full border rounded p-2" name="name" value={form.name} onChange={handleChange} placeholder="Название" required />
              <input className="w-full border rounded p-2" name="address" value={form.address} onChange={handleChange} placeholder="Адрес" required />
              <input className="w-full border rounded p-2" name="phone" value={form.phone} onChange={handleChange} placeholder="Телефон" required />
              <div className="flex gap-2">
                <input className="w-1/2 border rounded p-2" name="lat" value={form.lat} onChange={handleChange} placeholder="Широта (lat)" required />
                <input className="w-1/2 border rounded p-2" name="lng" value={form.lng} onChange={handleChange} placeholder="Долгота (lng)" required />
              </div>
              <textarea className="w-full border rounded p-2" name="text" value={form.text} onChange={handleChange} placeholder="Описание" />
              <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">{editId ? "Сохранить изменения" : "Добавить"}</button>
              {success && <div className="text-green-600 mt-2">{success}</div>}
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
            <div className="max-w-xl w-full">
              <h3 className="text-xl font-bold mb-2">Список амбулаторий</h3>
              {list.length === 0 && <div className="text-gray-400">Нет записей</div>}
              {list.map((item) => (
                <div key={item._id} className="border rounded p-4 mb-2 bg-white shadow">
                  <div className="font-semibold">{item.name}</div>
                  <div>Адрес: {item.address}</div>
                  <div>Телефон: {item.phone}</div>
                  <div>Широта: {item.lat}</div>
                  <div>Долгота: {item.lng}</div>
                  <div>{item.text}</div>
                  <div className="flex gap-4 mt-2">
                    <button className="text-blue-700 underline" onClick={() => handleEdit(item)}>Редактировать</button>
                    <button className="text-red-600 underline" onClick={() => handleDelete(item._id)}>Удалить</button>
                  </div>
                </div>
              ))}
            </div>
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
