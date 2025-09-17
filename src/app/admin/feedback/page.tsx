"use client";
import { useEffect, useState } from "react";

export default function FeedbackAdminPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);

  async function fetchFeedbacks() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/feedback?all=1");
      const data = await res.json();
      if (res.ok) setFeedbacks(data.feedbacks || []);
      else setError(data.error || "Ошибка загрузки");
    } catch {
      setError("Ошибка сети");
    }
    setLoading(false);
  }

  useEffect(() => { fetchFeedbacks(); }, []);

  async function handleDelete(id: string) {
    if (!window.confirm("Удалить это сообщение?")) return;
    setRemoving(id);
    try {
      const res = await fetch(`/api/feedback?id=${id}`, { method: "DELETE" });
      if (res.ok) setFeedbacks(fb => fb.filter(f => f._id !== id));
      else alert("Ошибка удаления");
    } catch {
      alert("Ошибка сети");
    }
    setRemoving(null);
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Обратная связь</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle bg-white">
          <thead className="table-light">
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Сообщение</th>
              <th>Дата</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="text-center text-muted">Загрузка...</td></tr>
            )}
            {!loading && feedbacks.length === 0 && (
              <tr><td colSpan={5} className="text-center text-muted">Нет сообщений</td></tr>
            )}
            {feedbacks.map((f) => (
              <tr key={f._id}>
                <td>{f.name}</td>
                <td>{f.email}</td>
                <td style={{maxWidth:320,wordBreak:'break-word'}}>{f.message}</td>
                <td>{new Date(f.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-danger" disabled={removing===f._id} onClick={() => handleDelete(f._id)}>
                    {removing===f._id ? "Удаление..." : "Удалить"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
