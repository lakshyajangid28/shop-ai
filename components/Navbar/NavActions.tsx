'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';

const NavActions = () => (
  <div className="hidden md:flex items-center space-x-4">
    <Link 
      href="/login" 
      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 transform hover:scale-110"
    >
      <User className="w-5 h-5" />
    </Link>

    <Link 
      href="/shopping-list" 
      className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 group transform hover:scale-110"
    >
      <ShoppingCart className="w-5 h-5" />
    </Link>
  </div>
);

export default NavActions;
