export default function Contacts() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-4">Контакты</h2>
      <div className="max-w-xl text-center text-lg">
        <p>Адрес: г. Москва, ул. Примерная, д. 1</p>
        <p>Телефон: +7 (495) 123-45-67</p>
        <p>Email: info@clinic.ru</p>
        <p>Часы работы: Пн-Пт 8:00-20:00, Сб-Вс 9:00-18:00</p>
      </div>
    </main>
  );
}
