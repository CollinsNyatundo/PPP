export interface NavItemType {
  name: string;
  to: string;
  path: string;
  ariaLabel: string;
}

export const NAV_ITEMS: NavItemType[] = [
  { 
    name: 'Home',
    to: 'home',
    path: '/',
    ariaLabel: 'Navigate to home section'
  },
  { 
    name: 'About',
    to: 'about',
    path: '/#about',
    ariaLabel: 'Navigate to about section'
  },
  { 
    name: 'Projects',
    to: 'projects',
    path: '/#projects',
    ariaLabel: 'Navigate to projects section'
  },
  { 
    name: 'Articles',
    to: 'blog',
    path: '/#blog',
    ariaLabel: 'Navigate to articles section'
  },
  { 
    name: 'Contact',
    to: 'contact',
    path: '/#contact',
    ariaLabel: 'Navigate to contact section'
  }
];