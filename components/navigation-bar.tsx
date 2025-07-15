"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { menuItems, MenuItem } from '@/lib/menu-data';
import styles from './navigation.module.css';

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
        <nav>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <NavMenuItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
