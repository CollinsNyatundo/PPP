import React from 'react';
import { NavItem } from './NavItem';
import { NavItemType } from '../../types/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  items: NavItemType[];
  isHomePage: boolean;
  onNavigate: (item: NavItemType) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  items,
  isHomePage,
  onNavigate,
}) => {
  return (
    <div
      id="mobile-menu"
      className={`
        md:hidden
        absolute
        left-0
        right-0
        top-full
        mt-2
        transition-all
        duration-300
        ease-in-out
        transform
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
        bg-gray-900/95
        backdrop-blur-md
        rounded-xl
        border
        border-white/20
        shadow-lg
        overflow-hidden
      `}
    >
      <div className="px-4 py-3 space-y-4">
        {items.map((item) => (
          <div key={item.name} className="block">
            <NavItem
              item={item}
              isHomePage={isHomePage}
              onNavigate={onNavigate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};