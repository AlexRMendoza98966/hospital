"use client"

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './background-slider.module.css';

const images = [
  'imagesFondoAnuncios/imagen1.jpg',
  'imagesFondoAnuncios/imagen2.jpg',
  'imagesFondoAnuncios/imagen3.jpg',
  'imagesFondoAnuncios/imagen4.jpg',
];

export function BackgroundSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const changeSlide = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div className={styles.sliderContainer}>
      {images.map((src, index) => (
        <div
          key={src}
          className={`${styles.slide} ${index === activeSlide ? styles.active : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      <button
        className={`${styles.arrow} ${styles.leftArrow}`}
        onClick={() => changeSlide('prev')}
      >
        <ChevronLeft size={30} />
      </button>

      <button
        className={`${styles.arrow} ${styles.rightArrow}`}
        onClick={() => changeSlide('next')}
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
}
