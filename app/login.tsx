"use client"

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
      <div className="bg-gray-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition-colors"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition-colors"><Twitter size={18} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors"><Instagram size={18} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-red-600 transition-colors"><Youtube size={18} /></a>
          </div>
          <div className="capitalize">
            {currentDate}
          </div>
        </div>
      </div>

      {/* Main Header with Background Image */}
      <div
        className="bg-cover bg-center flex items-center py-16 sm:py-24 md:py-32"
        style={{
          backgroundImage: `url('${getAssetPath('/fondo.jpg')}')`
        }}
      >
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-7">
          <Link href="/">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight text-center" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.8)' }}>
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
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2">
      <form className="bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-xs sm:max-w-md md:max-w-xl">
        {/* ...campos de login... */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu correo"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}