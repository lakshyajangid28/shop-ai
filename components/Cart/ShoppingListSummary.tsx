import React from 'react';

interface ShoppingListSummaryProps {
  total: number;
  itemCount: number;
}

const ShoppingListSummary: React.FC<ShoppingListSummaryProps> = ({ total, itemCount }) => (
  <div className="flex justify-between items-center bg-gradient-to-r from-blue-100 via-white to-purple-100 rounded-2xl shadow-lg p-6 mt-10 animate-fade-in">
    <div className="text-lg font-semibold text-gray-700 flex items-center gap-2">
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6h13" /></svg>
      Total Items: <span className="ml-1 font-bold text-blue-700">{itemCount}</span>
    </div>
    <div className="text-2xl font-extrabold text-purple-700">Total: ${total.toFixed(2)}</div>
  </div>
);

export default ShoppingListSummary;
