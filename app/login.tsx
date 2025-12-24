"use client"

import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { NavigationBar } from '../components/navigation-bar/navigation-bar';
import { getAssetPath } from '@/lib/paths';

export function Header() {
  const currentDate = format(new Date(), "eeee, d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <header>
      {/* Top bar with social icons and date */}
      <div className="py-2 text-white bg-gray-800">
        <div className="flex items-center justify-between px-4 mx-auto text-xs max-w-7xl sm:px-6 sm:text-sm">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-blue-500"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter" className="transition-colors hover:text-sky-400"><Twitter size={18} /></a>
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-pink-500"><Instagram size={18} /></a>
            <a href="#" aria-label="YouTube" className="transition-colors hover:text-red-600"><Youtube size={18} /></a>
          </div>
          <div className="capitalize">
            {currentDate}
          </div>
        </div>
      </div>

      {/* Main Header with Background Image */}
      <div
        className="flex items-center py-16 bg-center bg-cover sm:py-24 md:py-32"
        style={{
          backgroundImage: `url('${getAssetPath('/fondo.jpg')}')`
        }}
      >
        <div className="w-full max-w-3xl px-4 mx-auto sm:px-7">
          <Link href="/">
            <h1 className="text-xl font-extrabold tracking-tight text-center text-white sm:text-3xl md:text-5xl" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.8)' }}>
              HOSPITAL DEL NIÑO OVIDIO ALIAGA URÍA
            </h1>
          </Link>
        </div>
      </div>
      <NavigationBar />
    </header>
  );
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;

    if (!email || !password) {
      alert('Por favor ingresa tu correo y contraseña');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Error de conexión');
      }

      const data = await res.json();
      if (data.success) {
        alert(`Bienvenido ${data.user.nombre_completo}`);
        // Redirigir o guardar sesión aquí
      } else {
        alert(data.error || 'Error de login');
      }
    } catch (err) {
      alert('No se pudo conectar al servidor');
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-2 bg-gray-100">
      <form
        className="w-full max-w-xs p-4 bg-white rounded shadow-md sm:p-8 sm:max-w-md md:max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu correo"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 font-bold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <svg className="w-5 h-5 mr-2 text-white animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"/>
            </svg>
          ) : null}
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}