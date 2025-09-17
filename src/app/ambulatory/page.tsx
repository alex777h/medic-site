"use client";
import { useEffect, useState } from "react";
import HeaderContacts from "../components/HeaderContacts";

interface AmbulatoryData {
  name: string;
  address: string;
  phone: string;
  lat: string;
  lng: string;
  text: string;
}


export default function Ambulatory() {
  const [list, setList] = useState<AmbulatoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/ambulatory/all")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setLoading(false);
      });
  }, []);

  const filtered = list.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.address.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      (item.text && item.text.toLowerCase().includes(q))
    );
  });

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
        <h2 className="text-3xl font-bold mb-4">Амбулатории</h2>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по названию, адресу, телефону или описанию"
          className="mb-6 w-full max-w-xl border rounded p-2"
        />
        {loading ? (
          <div className="text-gray-500">Загрузка...</div>
        ) : (
          <div className="max-w-xl w-full space-y-8">
            {filtered.length === 0 && <div className="text-gray-400">Нет амбулаторий</div>}
            {filtered.map((data, idx) => (
              <div key={idx} className="border rounded p-4 bg-white shadow text-center text-lg space-y-2">
                <div className="font-bold text-2xl mb-2">{data.name}</div>
                <div>Адрес: {data.address}</div>
                <div>Телефон: {data.phone}</div>
                <div>Широта: {data.lat}</div>
                <div>Долгота: {data.lng}</div>
                <div className="mb-2">{data.text}</div>
                {data.lat && data.lng && !isNaN(parseFloat(data.lat)) && !isNaN(parseFloat(data.lng)) ? (
                  <div className="w-full h-64 rounded overflow-hidden border mt-4">
                    <iframe
                      title={`Карта амбулатории ${data.name}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(data.lng)-0.01}%2C${parseFloat(data.lat)-0.01}%2C${parseFloat(data.lng)+0.01}%2C${parseFloat(data.lat)+0.01}&layer=mapnik&marker=${data.lat}%2C${data.lng}`}
                    ></iframe>
                  </div>
                ) : (
                  <div className="text-gray-400 mt-4">Координаты не заданы или некорректны</div>
                )}
              </div>
            ))}
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
