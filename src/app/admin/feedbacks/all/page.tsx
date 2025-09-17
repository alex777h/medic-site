"use client";
import { useEffect, useState } from "react";

interface Feedback {
  _id: string;
  name: string;
  text: string;
  date: string;
  photoUrl?: string;
}

export default function AdminFeedbacksAllPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);

  async function fetchFeedbacks() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/feedback");
      const data = await res.json();
      if (res.ok) setFeedbacks(data);
      else setError(data.error || "Ошибка загрузки");
    } catch {
      setError("Ошибка сети");
    }
    setLoading(false);
  }

  useEffect(() => { fetchFeedbacks(); }, []);

  async function handleDelete(id: string) {
    if (!window.confirm("Удалить этот отклик?")) return;
    setRemoving(id);
    try {
      const res = await fetch("/api/admin/feedback", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) setFeedbacks(fb => fb.filter(f => f._id !== id));
      else alert("Ошибка удаления");
    } catch {
      alert("Ошибка сети");
    }
    setRemoving(null);
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-primary">Все отклики</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-4">
        {loading && (
          <div className="col-12 text-center text-muted">Загрузка...</div>
        )}
        {!loading && feedbacks.length === 0 && (
          <div className="col-12 text-center text-muted">Нет откликов</div>
        )}
        {feedbacks.map((f, i) => (
          <div className="col-12 col-md-6 col-lg-4" key={f._id}>
            <div className="card shadow-lg h-100 animate-fade-in" style={{animationDelay: `${i*60}ms`}}>
              <div className="card-body d-flex flex-column align-items-center text-center">
                {f.photoUrl && <img src={f.photoUrl} alt="Фото" className="rounded-circle mb-3 border border-2 border-primary" style={{width:64,height:64,objectFit:'cover'}} />}
                <h5 className="card-title text-primary mb-2">{f.name}</h5>
                <p className="card-text text-secondary mb-2" style={{minHeight:60}}>{f.text}</p>
                <div className="small text-muted mb-3">{new Date(f.date).toLocaleString()}</div>
                <button className="btn btn-sm btn-danger mt-auto" disabled={removing===f._id} onClick={() => handleDelete(f._id)}>
                  {removing===f._id ? "Удаление..." : "Удалить"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .animate-fade-in {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
