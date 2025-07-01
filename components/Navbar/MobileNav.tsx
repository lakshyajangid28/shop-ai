// components/Navbar/MobileNav.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import NavLink from './NavLink';
import navLinks from './navLinks';

interface Props {
  isOpen: boolean;
  closeMenu: () => void;
}

const MobileNav = ({ isOpen, closeMenu }: Props) => (
  <div
    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    }`}
  >
    <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100">
      {navLinks.map((link, index) => (
        <div
          key={link.href}
          className={`transform transition-all duration-300 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <NavLink
            href={link.href}
            className="block px-3 py-3 text-base font-medium rounded-lg hover:bg-purple-50"
            onClick={closeMenu}
          >
            {link.label}
          </NavLink>
        </div>
      ))}

      <div className="pt-4 space-y-3 border-t border-gray-200">
        <div className="flex items-center justify-between px-3">
          <Link
            href="/login"
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
            onClick={closeMenu}
          >
            <User className="w-5 h-5" />
            <span>Login</span>
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center space-x-2 p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
            onClick={closeMenu}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            <span className="absolute -top-1 left-6 w-4 h-4 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default MobileNav;
