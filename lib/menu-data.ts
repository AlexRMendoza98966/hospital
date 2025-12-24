export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { label: 'INICIO', href: '#' },
  {
    label: 'INSTITUCIONAL',
    href: '#',
    children: [
      { label: '1. Autoridades', href: '#' },
      { label: '2. Comité técnico administrativo', href: '#' },
      { label: '3. Académico', href: '#' },
      { label: '4. Casos clínicos', href: '#' },
      { label: '5. Residencia médica', href: '#' },
    ],
  },
  {
    label: 'HOSPITAL',
    href: '#',
    children: [
      { label: '1. Nuestro hospital', href: '#' },
      { label: '2. Misión y visión', href: '#' },
      { label: '3. Historia', href: '#' },
    ],
  },
  {
    label: 'INFORMACION',
    href: '#',
    children: [
      { label: '1. Consulta externa', href: '#' },
      { label: '2. Cartera de servicios', href: '#' },
    ],
  },
  { label: 'AUDITORIA', href: '#' },
  { label: 'TRANSPARENCIA', href: '#' },
  { label: 'LOGIN', href: '/login' },
];
