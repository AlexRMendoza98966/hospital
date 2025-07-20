"use client"

import { useState } from 'react';
import styles from './expanding-cards.module.css';

const panelData = [
  {
    image: 'imagesSomos/imagensomos.jpg',
    title: 'Nuestra Misión',
  },
  {
    image: 'imagesSomos/imagensomos1.jpg',
    title: 'Nuestra Visión',
  },
  {
    image: 'imagesSomos/imagensomos2.jpg',
    title: 'Nuestros Valores',
  },
  {
    image: 'imagesSomos/imagensomos3.jpg',
    title: 'Nuestra Historia',
  },
];

export function ExpandingCards() {
  const [activePanel, setActivePanel] = useState(0);

  return (
    <div className={styles.container}>
      {panelData.map((panel, index) => (
        <div
          key={index}
          className={`${styles.panel} ${index === activePanel ? styles.active : ''}`}
          style={{ backgroundImage: `url(${panel.image})` }}
          onClick={() => setActivePanel(index)}
        >
          <h3>{panel.title}</h3>
        </div>
      ))}
    </div>
  );
}
