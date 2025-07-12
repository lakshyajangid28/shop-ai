import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, className = '', onClick }: NavLinkProps) => {
  const pathname = usePathname() || '';
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`relative group px-3 cursor-pointer py-2 transition-all duration-300 ease-in-out 
        ${isActive ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-purple-600'} 
        ${className}`.trim()}
      onClick={onClick}
    >
      {children}
      <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 ease-out group-hover:w-full`}></span>
    </Link>
  );
};

export default NavLink;