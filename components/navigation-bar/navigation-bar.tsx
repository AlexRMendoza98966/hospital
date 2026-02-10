"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { menuItems, MenuItem } from '@/lib/menu-data';
import styles from './navigation.module.css';
import { useAuth } from '../../context/AuthContext';

const NavMenuItem = ({ item }: { item: MenuItem }) => {
  return (
    <li className={styles.navItem}>
      <Link href={item.href} className={styles.navLink}>
        {item.label}
        {item.children && <span className={styles.dropdownToggle}><ChevronDown size={16} /></span>}
      </Link>
      {item.children && (
        <ul className={styles.subMenu}>
          {item.children.map((child) => (
            <NavMenuItem key={child.label} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export function NavigationBar() {
  const [isSticky, setSticky] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setSticky(window.scrollY > navRef.current.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={navRef} className={`${styles.navbarMain} ${isSticky ? styles.navbarSticky : ''}`}>
      <div className={styles.container}>
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <NavMenuItem key={item.label} item={item} />
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {isAuthenticated && user?.nombre_completo && (
              <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full" style={{ marginRight: 8 }}>
                {user.nombre_completo}
              </span>
            )}
            {isAuthenticated && (
              <button onClick={logout} className="px-3 py-1 font-semibold text-white bg-red-600 rounded hover:bg-red-700">Cerrar sesión</button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
