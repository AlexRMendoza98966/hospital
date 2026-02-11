"use client"

import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { getAssetPath } from '@/lib/paths';

export function Header() {
  const currentDate = format(new Date(), "eeee, d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <header>
      {/* Top bar with social icons and date */}
      <div className="py-2 text-white bg-gray-800">
        <div className="flex items-center justify-between px-6 mx-auto text-sm max-w-7xl">
          <div className="flex items-center space-x-4">
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

      <div
        className="flex items-center py-80 bg-center bg-cover"
        style={{
          backgroundImage: `url('${getAssetPath('/fondo.jpg')}')`
        }}
      >
        <div className="mx-auto max-w-7xl px-7">
          <Link href="/">
            <h1 className="text-5xl font-extrabold tracking-tight text-center text-white" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.8)' }}>
              HOSPITAL DEL NIÑO DR. OVIDIO ALIAGA URÍA
            </h1>
          </Link>
        </div>
      </div>
      <NavigationBar />
    </header>
  );
}
