"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AmbulatoryData {
  name: string;
  address: string;
  phone: string;
  lat: string;
  lng: string;
  text: string;
}

export default function AdminAmbulatory() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch("/api/ambulatory")
      .then((res) => res.json())
      .then((data: AmbulatoryData) => {
        setName(data.name || "");
        setAddress(data.address || "");
        setPhone(data.phone || "");
  setLat(data.lat || "");
  setLng(data.lng || "");
        setText(data.text || "");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Ошибка загрузки данных");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const res = await fetch("/api/admin/ambulatory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address, phone, lat, lng, text }),
    });
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/admin");
      }, 2000);
      // Снять фокус с кнопки после сохранения
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } else {
      setError("Ошибка сохранения");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Редактировать страницу амбулатории</h2>
      {loading && <div className="text-gray-500 mb-2">Загрузка...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">Сохранено!</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="w-full border rounded p-2 mb-2"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Название амбулатории"
          required
        />
        <input
          className="w-full border rounded p-2 mb-2"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Адрес"
          required
        />
        <input
          className="w-full border rounded p-2 mb-2"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Телефон"
          required
        />
        <div className="flex gap-2 mb-2">
          <input
            className="w-1/2 border rounded p-2"
            type="text"
            value={lat}
            onChange={e => setLat(e.target.value)}
            placeholder="Широта (lat)"
            required
          />
          <input
            className="w-1/2 border rounded p-2"
            type="text"
            value={lng}
            onChange={e => setLng(e.target.value)}
            placeholder="Долгота (lng)"
            required
          />
        </div>
        <textarea
          className="w-full border rounded p-2 mb-4 min-h-[120px]"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Текст для страницы амбулатории"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          disabled={loading}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}
