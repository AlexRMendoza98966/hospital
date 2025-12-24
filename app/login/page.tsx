"use client"
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const password = document.getElementById('password')
    const background = document.getElementById('background')

    if (password && background) {
      password.addEventListener('input', (e) => {
        const input = (e.target as HTMLInputElement).value
        const length = input.length
        const blurValue = 20 - length * 2
        background.style.filter = `blur(${blurValue}px)`
      })
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert("Por favor ingrese sus credenciales");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Credenciales incorrectas");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success) {
        alert(`Bienvenido ${data.user.nombre_completo}`);
        // Redirigir o guardar sesión aquí
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      alert("No se pudo conectar al servidor");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="background" id="background"></div>
      <div
        className="p-12 mx-auto text-center bg-white rounded shadow-md login-container"
        style={{ width: "100vw", maxWidth: "800px" }}
      >
        <h1 className="w-full mb-6 text-3xl font-bold text-center" style={{ minWidth: "100%" }}>
          INICIAR SESIÓN
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="my-4 text-left">
            <label htmlFor="email" className="text-gray-900">Correo Electrónico:</label>
            <input
              type="text"
              className="block w-full p-3 mt-2 border rounded"
              id="email"
              placeholder="Ingrese su Correo Electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="my-4 text-left">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className="block w-full p-3 mt-2 border rounded"
              id="password"
              placeholder="Ingrese su Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button
            className={`bg-black text-white py-3 mt-6 inline-block w-full rounded text-lg flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <svg className="w-5 h-5 mr-2 text-white animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"/>
              </svg>
            ) : null}
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
