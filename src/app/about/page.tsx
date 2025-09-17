import HeaderContacts from "../components/HeaderContacts";

export default function About() {
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
        <h2 className="text-3xl font-bold mb-4">О клинике</h2>
        <p className="max-w-xl text-center text-lg">
          Медицинский центр "Здоровье" — современное учреждение, предоставляющее широкий спектр медицинских услуг для взрослых и детей. Наши специалисты имеют высокую квалификацию и большой опыт работы. Мы заботимся о вашем здоровье и комфорте!
        </p>
      </main>
      <footer className="w-full bg-gray-100 text-gray-600 py-4 mt-auto shadow-inner">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Медицинский центр "Здоровье". Все права защищены.
        </div>
      </footer>
    </div>
  );
}
