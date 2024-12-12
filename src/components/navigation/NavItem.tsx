import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

interface NavItemProps {
  item: {
    name: string;
    to: string;
    path: string;
    ariaLabel: string;
  };
  isHomePage: boolean;
  onNavigate: (item: { name: string; to: string; path: string; ariaLabel: string }) => void;
}

export const NavItem: React.FC<NavItemProps> = ({ item, isHomePage, onNavigate }) => {
  if (isHomePage) {
    return (
      <ScrollLink
        to={item.to}
        smooth={true}
        duration={500}
        offset={-80}
        spy={true}
        activeClass="text-purple-400"
        className="relative inline-block px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200 hover:scale-102 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center group"
        onClick={() => onNavigate(item)}
        role="button"
        tabIndex={0}
        aria-label={item.ariaLabel}
      >
        {item.name}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
      </ScrollLink>
    );
  }

  return (
    <RouterLink
      to={item.path}
      className="relative inline-block px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200 hover:scale-102 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center group"
      onClick={() => onNavigate(item)}
      aria-label={item.ariaLabel}
    >
      {item.name}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
    </RouterLink>
  );
};