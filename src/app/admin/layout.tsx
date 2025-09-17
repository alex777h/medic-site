"use client";
import { useEffect, useState } from "react";
import AdminAuth from "./auth";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuth(localStorage.getItem("admin_auth") === "1");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setAuth(false);
    window.location.reload();
  };

  if (!auth) {
    return <AdminAuth onAuth={() => setAuth(true)} />;
  }
  return (
    <div>
      <div className="w-full flex justify-end p-2 bg-gray-100 border-b">
        <button onClick={handleLogout} className="bg-red-600 text-white rounded px-4 py-1 text-sm">Выйти</button>
      </div>
      {children}
    </div>
  );
}
