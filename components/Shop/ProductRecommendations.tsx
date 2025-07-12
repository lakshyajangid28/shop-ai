import React from "react";
import useProductSearch from "@/hooks/useProductSearch";
import ProductCard from "./ProductCard";

const ProductRecommendations = ({ isSignedIn, shoppingList }: any) => {
  const { products, query, loading } = useProductSearch();

  if (!isSignedIn || (shoppingList.length === 0 && !query)) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-lg text-gray-600">
        Add something to your shopping list to get personalized recommendations!
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="text-purple-600 font-semibold animate-pulse">Loading recommendations...</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-lg text-gray-600">
        No products found. Try searching for something else!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductRecommendations;