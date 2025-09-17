import { useEffect, useState } from "react";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  description?: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then(setDoctors);
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-4">Наши врачи</h2>
      <div className="w-full max-w-2xl grid gap-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{doc.name}</h3>
            <p className="text-gray-700">{doc.specialty}</p>
            <p>Телефон: {doc.phone}</p>
            <p>Email: {doc.email}</p>
            {doc.description && <p>{doc.description}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
