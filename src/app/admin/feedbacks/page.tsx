"use client";
import { useState } from "react";

export default function AdminFeedbacksAddPage() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    if (!name || !text) {
      setError("Заполните все поля");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/admin/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text, photoUrl })
      });
      if (!res.ok) throw new Error();
      setSuccess("Отклик добавлен!");
      setName(""); setText(""); setPhotoUrl("");
    } catch {
      setError("Ошибка при добавлении");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center fw-bold text-primary">Добавить отклик</h1>
      <form className="mx-auto p-4 mb-4 bg-white rounded-4 shadow-lg" style={{maxWidth:500}} onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3">
          <label className="form-label fw-semibold">Имя</label>
          <input className="form-control rounded-3 border-primary-subtle shadow-sm focus:border-primary focus:ring-2 focus:ring-primary" value={name} onChange={e=>setName(e.target.value)} maxLength={40} disabled={loading} placeholder="Ваше имя" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Текст отклика</label>
          <textarea className="form-control rounded-3 border-primary-subtle shadow-sm focus:border-primary focus:ring-2 focus:ring-primary" value={text} onChange={e=>setText(e.target.value)} maxLength={600} rows={3} disabled={loading} placeholder="Ваш отзыв..." />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Фото (URL, опционально)</label>
          <input className="form-control rounded-3 border-info-subtle shadow-sm focus:border-info focus:ring-2 focus:ring-info" value={photoUrl} onChange={e=>setPhotoUrl(e.target.value)} maxLength={300} disabled={loading} placeholder="https://..." />
        </div>
        {error && <div className="alert alert-danger py-1 my-2 text-center rounded-3">{error}</div>}
        {success && <div className="alert alert-success py-1 my-2 text-center rounded-3">{success}</div>}
        <button className="btn btn-gradient-primary w-100 py-2 fw-semibold rounded-3 shadow-sm" type="submit" disabled={loading} style={{background: 'linear-gradient(90deg,#2563eb 0%,#06b6d4 100%)', border:0}}>
          {loading ? <span><span className="spinner-border spinner-border-sm me-2"></span>Добавление...</span> : "Добавить отклик"}
        </button>
      </form>
    </div>
  );
}
