// components/Logo.tsx
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center group">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>
      <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
        ShopAI
      </span>
    </Link>
  );
};

export default Logo;