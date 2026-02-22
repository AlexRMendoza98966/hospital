export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { label: 'INICIO', href: '/' },
  {
    label: 'INSTITUCIONAL',
    href: '#',
    children: [
      { label: '1. Autoridades', href: '/autoridades-create-post' },
      { label: '2. Comité técnico administrativo', href: '/comite-tecnico-administrativo' },
      { label: '3. Académico', href: '/academico' },
      { label: '4. Casos clínicos', href: '/casos-clinicos' },
      { label: '5. Residencia médica', href: '/residencia-medica' },
    ],
  },
  {
    label: 'HOSPITAL',
    href: '#',
    children: [
      { label: '1. Nuestro hospital', href: '/nuestro-hospital' },
      { label: '2. Misión y visión', href: '/mision-vision' },
      { label: '3. Historia', href: '/historia' },
    ],
  },
  {
    label: 'INFORMACION',
    href: '#',
    children: [
      { label: '1. Consulta externa', href: '/consulta-externa' },
      { label: '2. Cartera de servicios', href: '/cartera-servicios' },
    ],
  },
  { label: 'AUDITORIA', href: '/auditoria' },
  {
    label: 'TRANSPARENCIA',
    href: '#',
    children: [
      { label: 'Rendición de cuentas', href: '/rendicion-cuentas' },
    ]
  },
  { label: 'INICIAR SESIÓN', href: '/login' },
];
