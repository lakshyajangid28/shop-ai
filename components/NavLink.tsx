// components/NavLink.tsx
import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, className = '', onClick }: NavLinkProps) => (
  <Link
    href={href}
    className={`relative group px-3 py-2 text-gray-700 hover:text-purple-600 transition-all duration-300 ease-in-out ${className}`}
    onClick={onClick}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400 group-hover:w-full transition-all duration-300 ease-out"></span>
  </Link>
);

export default NavLink;