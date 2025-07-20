import React, { useEffect, useState } from 'react';
import styles from './navigation.module.css';

const NavigationBar: React.FC = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    // Solo se ejecuta en cliente, seguro para SSR
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbarMain} ${sticky ? styles.navbarSticky : ''}`}>
      {/* ...existing navigation content... */}
    </nav>
  );
};

export default NavigationBar;
