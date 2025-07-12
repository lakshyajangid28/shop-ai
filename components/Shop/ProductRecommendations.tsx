import React from "react";
import ProductCard from "../ChatBox/ChatProductCard";

const ProductRecommendations = ({ isSignedIn, shoppingList, products, query, loading }: any) => {

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 text-center text-lg text-gray-600">
        <span className="text-purple-600 font-semibold animate-pulse">Loading recommendations...</span>
      </div>
    );
  }
  
  if (!isSignedIn || (shoppingList.length === 0 && !query)) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 text-center text-lg text-gray-600">
        Add something to your shopping list to get personalized recommendations!
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 text-center text-lg text-gray-600">
        No products found. Try searching for something else!
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 text-center text-lg text-gray-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product: any) => (
        <ProductCard idx={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductRecommendations;