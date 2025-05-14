"use client";
import Link from "next/link";
import { useAuthContext } from "../app/context/AuthContext";
import { useEffect, useState } from 'react';
import signOutUser from "../../firebase/auth/signout";

export default function Home() {
  const { user, loading } = useAuthContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-amarillo">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a13a4a]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amarillo">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-burdeos drop-shadow-lg text-center">
          Cartas sin marcar
        </h1>
        <p className="text-lg text-negroprofundo text-center max-w-md">
          Un lugar donde enviar cartas a la antigua
        </p>
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          {!loading && (user ? (
            <>
              <Link href="/cartas">
                <button className="px-6 py-3 rounded-full bg-burdeos text-white font-bold shadow bg-[#a13a4a] transition cursor-pointer">
                  Ver cartas disponibles
                </button>
              </Link>
              <Link href="/nueva-carta">
                <button className="px-6 py-3 rounded-full bg-amarillo text-burdeos font-bold shadow border border-burdeos bg-yellow-300 transition cursor-pointer">
                  Agregar nueva carta
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="px-6 py-3 rounded-full bg-gray-300 text-gray-700 font-bold shadow transition cursor-pointer hover:bg-gray-400"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href="/signin">
              <button className="px-6 py-3 rounded-full bg-burdeos text-white font-bold shadow bg-[#a13a4a] transition cursor-pointer">
                Autenticarse
              </button>
            </Link>
          ))}
          <Link href="/tutorial">
            <button className="px-6 py-3 rounded-full bg-[#bfa77a] text-white font-bold shadow transition cursor-pointer">
              Ir al tutorial
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}