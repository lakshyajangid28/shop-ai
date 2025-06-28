// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import Logo from './Logo';
import NavLink from './NavLink';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const closeMenu = () => setIsMenuOpen(false);

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/ai-agent', label: 'AI Agent' },
    { href: '/features', label: 'Features' }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigationLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Icon */}
            <Link 
              href="/login" 
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 transform hover:scale-110"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Shopping Cart */}
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 group transform hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                3
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transform rotate-180 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100">
          {navigationLinks.map((link, index) => (
            <div
              key={link.href}
              className={`transform transition-all duration-300 ${
                isMenuOpen 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-4 opacity-0'
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
          
          {/* Mobile Actions */}
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
    </nav>
  );
};

export default Navbar;