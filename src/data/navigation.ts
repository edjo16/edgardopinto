export type NavItem = {
  id: string;
  label: string;
  index: string;
};

export const navItems: NavItem[] = [
  { id: 'home', label: 'Inicio', index: '01' },
  { id: 'about', label: 'Perfil', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'projects', label: 'Misiones', index: '04' },
  { id: 'experience', label: 'Trayectoria', index: '05' },
  { id: 'contact', label: 'Contacto', index: '06' },
];
