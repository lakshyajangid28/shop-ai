import React from 'react';

export interface ShoppingListItem {
  id: string;
  title: string;
  image: string;
  price: string;
  link: string;
}

interface ShoppingListProps {
  items: ShoppingListItem[];
  onRemove: (id: string) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onRemove }) => {
  if (items.length === 0) {
    return <div className="text-center text-gray-400 py-12 text-lg">Your shopping list is empty.</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {items.map(item => (
        <div key={item.id} className="flex items-center bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl shadow-xl p-6 gap-6 hover:scale-[1.02] transition-transform">
          <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-xl border-2 border-blue-200 shadow-md" />
          <div className="flex-1">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-blue-700 hover:underline">
              {item.title}
            </a>
            <div className="text-lg font-bold text-gray-800 mt-2">{item.price}</div>
          </div>
          <button
            onClick={() => onRemove(item.link)}
            className="ml-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;
