import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
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

  const handleNavigation = (item: typeof navItems[0]) => {
    if (!isHomePage) {
      window.location.href = item.path;
      return;
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (!isHomePage) {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const renderNavLink = (item: typeof navItems[0]) => {
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
          onClick={() => handleNavigation(item)}
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
        onClick={() => handleNavigation(item)}
        aria-label={item.ariaLabel}
      >
        {item.name}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
      </RouterLink>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[900px] mx-auto px-4">
        <div className={`
          relative
          rounded-xl
          backdrop-blur-md
          border border-white/20
          shadow-lg
          transition-all duration-300
          ${isScrolled ? 'bg-white/15' : 'bg-transparent'}
          px-6 py-3
        `}>
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogoClick}
              className="group transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg p-1"
              aria-label="Go to homepage"
            >
              <Logo />
            </button>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.name}>{renderNavLink(item)}</div>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

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
              {navItems.map((item) => (
                <div key={item.name} className="block">
                  {renderNavLink(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;