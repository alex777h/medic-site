

"use client";

import { useEffect, useState, useRef } from "react";
import FeedbackCarousel from "@/components/FeedbackCarousel";

// Форма обратной связи в футере (горизонтальная, рабочая)
function FooterFeedbackForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const message = msgRef.current?.value.trim();
    const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    if (!name || !email || !message) {
      setError("Пожалуйста, заполните все поля.");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Введите корректный email.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      if (!res.ok) throw new Error("Ошибка при отправке");
      setSuccess("Спасибо за ваш отзыв!");
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (msgRef.current) msgRef.current.value = "";
    } catch {
      setError("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="row justify-content-center mb-4">
      <form className="col-12 col-lg-10 card p-3 flex-row flex-wrap flex-lg-nowrap align-items-center bg-white/10 border-0" style={{gap:'1rem'}} onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group mb-2 mb-lg-0 flex-fill me-lg-2">
          <input type="text" className="form-control" placeholder="Ваше имя" maxLength={40} ref={nameRef} disabled={loading} />
        </div>
        <div className="form-group mb-2 mb-lg-0 flex-fill me-lg-2">
          <input type="email" className="form-control" placeholder="Email" maxLength={60} ref={emailRef} disabled={loading} />
        </div>
        <div className="form-group mb-2 mb-lg-0 flex-fill me-lg-2">
          <input type="text" className="form-control" placeholder="Сообщение" maxLength={500} ref={msgRef} disabled={loading} />
        </div>
        <button type="submit" className="btn btn-primary px-4" disabled={loading}>{loading ? "Отправка..." : "Отправить"}</button>
        {error && <div className="alert alert-danger py-1 my-2 text-center w-100">{error}</div>}
        {success && <div className="alert alert-success py-1 my-2 text-center w-100">{success}</div>}
      </form>
    </div>
  );
}
// --- Форма обратной связи с отправкой в базу ---
function FeedbackForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const message = msgRef.current?.value.trim();
    const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    if (!name || !email || !message) {
      setError("Пожалуйста, заполните все поля.");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Введите корректный email.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      if (!res.ok) throw new Error("Ошибка при отправке");
      setSuccess("Спасибо за ваш отзыв!");
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (msgRef.current) msgRef.current.value = "";
    } catch {
      setError("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card p-4 mt-3" onSubmit={handleSubmit} autoComplete="off">
      <h4 className="mb-3 text-center">Обратная связь</h4>
      <div className="mb-3">
        <label htmlFor="feedbackName" className="form-label">Ваше имя</label>
        <input
          type="text"
          className="form-control"
          id="feedbackName"
          ref={nameRef}
          maxLength={40}
          disabled={loading}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="feedbackEmail" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="feedbackEmail"
          ref={emailRef}
          maxLength={60}
          disabled={loading}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="feedbackMsg" className="form-label">Сообщение</label>
        <textarea
          className="form-control"
          id="feedbackMsg"
          rows={3}
          ref={msgRef}
          maxLength={500}
          disabled={loading}
        />
      </div>
      {error && <div className="alert alert-danger py-1 my-2 text-center">{error}</div>}
      {success && <div className="alert alert-success py-1 my-2 text-center">{success}</div>}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
}
// Слайдер с медицинскими изображениями
const sliderImages = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    alt: "Врач с пациентом"
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd07?auto=format&fit=crop&w=600&q=80",
    alt: "Медицинское оборудование"
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    alt: "Сердцебиение на мониторе"
  },
  {
    src: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=600&q=80",
    alt: "Команда врачей"
  },
];

function MedicalSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <div className="w-full max-w-xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg relative group">
      {sliderImages.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute top-0 left-0 w-full h-64 object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ borderRadius: '1rem' }}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {sliderImages.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full border border-white bg-white/70 transition-all duration-300 ${i === index ? 'bg-cyan-500 scale-110' : 'bg-white/50'}`}
            onClick={() => setIndex(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
// Кнопка "Вверх"
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 z-50 p-0.5 rounded-full shadow-lg bg-gradient-to-br from-cyan-500 to-blue-700 hover:from-blue-700 hover:to-cyan-400 transition-all duration-300 border-2 border-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} group`}
      aria-label="Наверх"
    >
      <span className="flex items-center justify-center w-12 h-12">
        <svg className="w-7 h-7 text-white group-hover:text-cyan-100 transition" fill="none" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </button>
  );
}

import HeaderContacts from "./components/HeaderContacts";


interface NewsItem {
  _id: string;
  title: string;
  date: string;
  text: string;
}

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  description?: string;
}


import { ReactNode } from "react";

interface AnimatedBlockProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function AnimatedBlock({ children, delay = 0, className = "" }: AnimatedBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      setTimeout(() => {
        el.classList.remove("opacity-0", "translate-y-8");
      }, delay);
    }
  }, [delay]);
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/news")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTopButton />
      <header className="w-full bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 text-white py-6 shadow-lg relative z-10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 shadow-md mr-2">
              <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="16" stroke="#2563eb" strokeWidth="2" opacity="0.18">
                  <animate attributeName="r" values="16;18;16" dur="1.4s" repeatCount="indefinite"/>
                </circle>
                <polyline points="5,20 13,20 16,27 22,11 26,20 35,20" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
                  <animate attributeName="points" values="5,20 13,20 16,27 22,11 26,20 35,20;5,20 13,19 16,29 22,9 26,21 35,20;5,20 13,20 16,27 22,11 26,20 35,20" dur="1.4s" repeatCount="indefinite"/>
                </polyline>
                <circle cx="20" cy="20" r="12" fill="#06b6d4" opacity="0.13"/>
              </svg>
            </span>
            <span className="text-3xl font-extrabold tracking-tight drop-shadow-lg">Медицинский центр "Здоровье"</span>
          </div>
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
      <main className="flex flex-1 flex-row items-start justify-center p-8 gap-8 w-full max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center">
          <MedicalSlider />
          <AnimatedBlock delay={0}>
            <div className="flex flex-col items-center mb-6 animate-fade-in">
              <p className="text-lg mb-8 mt-2 text-center">Добро пожаловать на сайт нашего медицинского учреждения!</p>
            </div>
          </AnimatedBlock>
          <FeedbackCarousel />
        </div>
        <AnimatedBlock delay={200} className="w-full max-w-xs">
          <aside className="relative bg-gradient-to-br from-blue-50 via-cyan-100 to-white border border-blue-200 rounded-2xl shadow-xl p-6 mt-4 overflow-hidden flex flex-col min-h-[340px] max-h-[none]">
            <div className="absolute -top-6 -right-6 opacity-20 pointer-events-none select-none">
              <svg width="96" height="96" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="16" fill="#2563eb"/><path d="M16 8v16M8 16h16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <h3 className="text-2xl font-extrabold mb-5 text-blue-700 flex items-center gap-2 z-10">
              <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Новости
            </h3>
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar z-10 mb-4">
              {news.length === 0 && <div className="text-gray-400 text-center mt-8">Нет новостей</div>}
              {news.map((item) => (
                <div className="mb-5 last:mb-0 bg-white/80 rounded-lg p-3 shadow-sm border border-blue-100 hover:shadow-md transition" key={item._id}>
                  <div className="font-semibold text-blue-900 mb-1 truncate" title={item.title}>{item.title}</div>
                  <div className="text-xs text-cyan-600 mb-1">{item.date}</div>
                  <div className="text-gray-700 text-sm mb-1 line-clamp-3">{item.text}</div>
                </div>
              ))}
            </div>
            <a href="/news" className="block text-cyan-700 font-semibold underline text-right mt-2 z-10 hover:text-cyan-900 transition mb-4">Все новости</a>
            {/* Форма обратной связи теперь в футере */}
          </aside>
        </AnimatedBlock>
      </main>

      <footer className="w-full bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 text-white py-6 mt-auto shadow-inner border-t border-blue-800/30">
        <div className="container mx-auto px-4">
          {/* Форма обратной связи горизонтально */}
          <FooterFeedbackForm />
          <div className="row align-items-center gy-4">
            <div className="col-12 col-md-4 d-flex align-items-center gap-2 mb-3 mb-md-0">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shadow mr-1">
                <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16" stroke="#2563eb" strokeWidth="2" opacity="0.18">
                    <animate attributeName="r" values="16;18;16" dur="1.4s" repeatCount="indefinite"/>
                  </circle>
                  <polyline points="5,20 13,20 16,27 22,11 26,20 35,20" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
                    <animate attributeName="points" values="5,20 13,20 16,27 22,11 26,20 35,20;5,20 13,19 16,29 22,9 26,21 35,20;5,20 13,20 16,27 22,11 26,20 35,20" dur="1.4s" repeatCount="indefinite"/>
                  </polyline>
                  <circle cx="20" cy="20" r="12" fill="#06b6d4" opacity="0.13"/>
                </svg>
              </span>
              <span className="font-semibold">Медицинский центр "Здоровье"</span>
            </div>
            <div className="col-12 col-md-4 d-flex flex-column flex-md-row align-items-center gap-2 justify-content-md-end text-cyan-100/80">
              <svg className="w-5 h-5 text-cyan-200" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Пн–Пт: 8:00–20:00, Сб: 9:00–15:00</span>
              <span className="d-none d-md-inline">|</span>
              <span className="ms-3 text-end flex-fill">&copy; {new Date().getFullYear()} Все права защищены.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
