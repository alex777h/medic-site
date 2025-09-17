"use client";
import { useEffect, useState } from "react";

interface ContactsData {
  address: string;
  phone: string;
  email: string;
}

export default function HeaderContacts() {
  const [contacts, setContacts] = useState<ContactsData | null>(null);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  return (
    <>
      <span className="text-sm">| {contacts?.address || "г. Москва, ул. Примерная, д. 1"}</span>
      <span className="text-sm">| Тел.: {contacts?.phone || "+7 (495) 123-45-67"}</span>
      <span className="text-sm">| Email: {contacts?.email || "info@clinic.ru"}</span>
    </>
  );
}
