// components/Navbar/Navbar.tsx
'use client';

import { useState } from 'react';
import Logo from '../Logo';
import NavActions from './NavActions';
import DesktopNav from './DesktopNav';
import MobileToggle from './MobileToggle';
import MobileNav from './MobileNav';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <DesktopNav />
          <NavActions />
          <MobileToggle isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </div>

      <MobileNav isOpen={isMenuOpen} closeMenu={closeMenu} />
    </nav>
  );
};

export default Navbar;
