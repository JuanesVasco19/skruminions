"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function SignIn() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()
        setError('')
        const { result, error } = await signIn(email, password);
        if (error) {
            setError("Error al iniciar sesión. Verifica tus credenciales.")
            console.log(error)
            return;
        }
        // Inicio de sesión exitoso
        console.log(result)
        return router.push("/cartas")
    }

    return (
        <div className="max-w-md mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6 text-[#8B2C3B]">Iniciar Sesión</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleForm} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        className="w-full border border-[#ffe6a0] rounded px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Contraseña</label>
                    <input
                        type="password"
                        className="w-full border border-[#ffe6a0] rounded px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm hover:bg-[#ffda6a] transition"
                >
                    Iniciar Sesión
                </button>
            </form>
            <div className="mt-4 text-center">
                <p>¿No tienes una cuenta? <Link href="/signup" className="text-[#8B2C3B] hover:underline">Regístrate</Link></p>
            </div>
        </div>
    );
}