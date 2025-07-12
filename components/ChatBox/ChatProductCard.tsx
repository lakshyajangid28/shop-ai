import React, { useState } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';
import { useUser } from '@clerk/nextjs';

interface Product {
  image?: string;
  title?: string;
  price?: string;
  rating?: string | number;
  reason?: string;
  link?: string;
  rank?: number;
}

interface ProductCardProps {
  product: Product;
  idx: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, idx }) => {
  const [adding, setAdding] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();

  const handleAddToCart = async () => {
    if (!isLoaded || !isSignedIn || !user) {
      Swal.fire({ title: 'Sign in required', text: 'Please sign in to add items to your cart.', icon: 'warning' });
      return;
    }
    setAdding(true);
    try {
      const res = await fetch(`/api/cart?userId=${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: product.title,
          price: product.price,
          link: product.link,
          image: product.image,
        }),
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      Swal.fire({ title: 'Added!', text: 'Product added to cart.', icon: 'success', timer: 1200, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Could not add to cart.', icon: 'error' });
    }
    setAdding(false);
  };

  return (
    <div className="group relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden">
      {/* Rank Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          #{product.rank || idx + 1} Choice
        </div>
      </div>

      {/* Product Image */}
      {product.image && (
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Product Info */}
      <div className="p-6">
        <h4 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title || 'Product Title Not Available'}
        </h4>

        <div className="flex items-center justify-between mb-4">
          {product.price && (
            <span className="text-2xl font-bold text-green-600">{product.price}</span>
          )}
          {product.rating && (
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-gray-700">{product.rating}</span>
            </div>
          )}
        </div>

        {product.reason && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-blue-600">Why this works: </span>
              {product.reason}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 mt-4">
          {product.link && (
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-4 h-4 inline mr-2" />
              Where to buy?
            </a>
          )}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full cursor-pointer inline-block text-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;