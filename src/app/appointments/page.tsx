"use client";
import { useState, useEffect } from "react";

interface Doctor {
  _id: string;
  name: string;
}

export default function AppointmentPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState({
    doctorId: "",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    date: "",
    comment: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then(setDoctors);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, date: new Date(form.date) }),
    });
    if (res.ok) {
      setSuccess(true);
      setForm({ doctorId: "", patientName: "", patientPhone: "", patientEmail: "", date: "", comment: "" });
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-4">Записаться на прием</h2>
      {success && <div className="mb-4 text-green-600">Заявка успешно отправлена!</div>}
      <form className="w-full max-w-md grid gap-4" onSubmit={handleSubmit}>
        <label>
          Врач:
          <select name="doctorId" value={form.doctorId} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="">Выберите врача</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>{doc.name}</option>
            ))}
          </select>
        </label>
        <label>
          Ваше имя:
          <input name="patientName" value={form.patientName} onChange={handleChange} required className="w-full border rounded p-2" />
        </label>
        <label>
          Телефон:
          <input name="patientPhone" value={form.patientPhone} onChange={handleChange} required className="w-full border rounded p-2" />
        </label>
        <label>
          Email:
          <input name="patientEmail" value={form.patientEmail} onChange={handleChange} required className="w-full border rounded p-2" />
        </label>
        <label>
          Дата и время:
          <input type="datetime-local" name="date" value={form.date} onChange={handleChange} required className="w-full border rounded p-2" />
        </label>
        <label>
          Комментарий:
          <textarea name="comment" value={form.comment} onChange={handleChange} className="w-full border rounded p-2" />
        </label>
        <button type="submit" className="bg-blue-600 text-white rounded p-2">Записаться</button>
      </form>
    </main>
  );
}
