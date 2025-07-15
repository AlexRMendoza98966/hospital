export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { label: 'Inicio', href: '#' },
  {
    label: 'INSTITUCIONAL',
    href: '#',
    children: [
      { label: 'MISIÓN Y VISIÓN', href: '#' },
      { label: 'PRINCIPIOS Y VALORES', href: '#' },
      { label: 'OBJETIVOS', href: '#' },
      { label: 'AUTORIDADES', href: '#' },
      { label: 'DIRECTORES DE HOSPITALES SEDES LA PAZ', href: '#' },
      { label: 'MARCO NORMATIVO', href: '#' },
      { label: 'ORGANIGRAMA', href: '#' },
      { label: 'HISTORIA', href: '#' },
    ],
  },
  {
    label: 'UNIDADES',
    href: '#',
    children: [
      { 
        label: 'NIVEL EJECUTIVO', 
        href: '#',
        children: [
          { label: 'Dirección Técnica Servicio Departamental de Salud', href: '#' }
        ]
      },
      { 
        label: 'NIVEL DE ASESORAMIENTO Y APOYO', 
        href: '#',
        children: [
          { label: 'Unidad de Auditoria Interna', href: '#' },
          { label: 'Unidad de Transparencia', href: '#' },
          { label: 'Unidad De Comunicación, Protocolo Y Relaciones Públicas', href: '#' },
        ]
      },
    ],
  },
  {
    label: 'COMUNICADOS',
    href: '#',
    children: [
      { label: 'BOLETINES', href: '#' },
      { label: 'CAMPAÑAS', href: '#' },
      { label: 'CIRCULARES', href: '#' },
      { label: 'CONVOCATORIAS', href: '#' },
      { label: 'LABORATORIOS AUTORIZADOS', href: '#' },
    ],
  },
  {
    label: 'PUBLICACIONES',
    href: '#',
    children: [
      { label: 'LIBROS', href: '#' },
      { label: 'Covid-19', href: '#' },
    ],
  },
  {
    label: 'TRANSPARENCIA',
    href: '#',
    children: [
      { label: 'RESOLUCIONES ADMINISTRATIVAS', href: '#' },
      { label: 'INFORME DE AUDITORIAS INTERNAS', href: '#' },
    ],
  },
  { label: 'SOBRE NOSOTROS', href: '#' },
  { label: 'PRENSA', href: '#' },
];
