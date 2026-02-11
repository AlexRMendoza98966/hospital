"use client"

import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { NavigationBar } from './navigation-bar/navigation-bar';
import { getAssetPath } from '@/lib/paths';

export function Header() {
  const currentDate = format(new Date(), "eeee, d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <header>
      {/* Top bar with social icons and date */}
      <div className="bg-gray-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
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
        className="bg-cover bg-center flex items-center justify-center h-[750px] relative"
        style={{
          backgroundImage: `url('${getAssetPath('/fondo.jpg')}')`
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div> {/* Overlay oscuro opcional para mejorar legibilidad */}
        <div className="max-w-7xl mx-auto px-4 relative z-150">
          <Link href="/">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight text-center drop-shadow-lg" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.8)' }}>
              HOSPITAL DEL NIÑO OVIDIO ALIAGA URÍA
            </h1>
          </Link>
        </div>
      </div>
      <NavigationBar />
    </header>
  );
}
