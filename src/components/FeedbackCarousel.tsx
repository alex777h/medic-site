"use client";
import { useEffect, useState } from "react";

interface Feedback {
  _id: string;
  name: string;
  text: string;
  date: string;
  photoUrl?: string;
}

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/feedback")
      .then(res => res.json())
      .then(data => setFeedbacks(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center text-muted py-4">Загрузка откликов...</div>;
  if (!feedbacks.length) return null;

  return (
    <section className="w-100 mb-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Отзывы наших клиентов</h2>
      <div id="feedbackCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {feedbacks.map((f, i) => (
            <div className={`carousel-item${i===0 ? ' active' : ''}`} key={f._id}>
              <div className="d-flex flex-column align-items-center p-4 bg-white rounded-4 shadow-lg mx-auto animate-fade-in" style={{maxWidth:520, animationDelay: `${i*60}ms`}}>
                {f.photoUrl && <img src={f.photoUrl} alt="Фото" className="rounded-circle mb-3 border border-2 border-primary" style={{width:72,height:72,objectFit:'cover'}} />}
                <blockquote className="blockquote mb-2"><p className="mb-0 fs-5 fst-italic text-secondary">{f.text}</p></blockquote>
                <footer className="blockquote-footer mt-2 fw-semibold text-primary">{f.name}</footer>
              </div>
            </div>
          ))}
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
        <button className="carousel-control-prev" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Предыдущий</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Следующий</span>
        </button>
      </div>
    </section>
  );
}
