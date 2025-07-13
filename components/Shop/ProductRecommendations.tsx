import React from "react";
import ProductCard from "../ChatBox/ChatProductCard";

interface ProductRecommendationsProps {
  isSignedIn?: boolean; // Made optional with ?
  shoppingList: any[];
  products: any[];
  query: string;
  loading: boolean;
}

const ProductRecommendations = ({
  isSignedIn = false, // Default value if undefined
  shoppingList,
  products,
  query,
  loading,
}: ProductRecommendationsProps) => {
  console.log(products);
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 text-center text-lg text-gray-600">
        <span className="text-purple-600 font-semibold animate-pulse">
          Loading recommendations...
        </span>
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
      {products.map((product: any, idx: number) => {
        const normalizedProduct = {
          image: product.image || "", // optional if backend includes image
          title: product.title,
          price: product.price,
          rating: product.rating || "", // optional
          link: product.link, // optional direct link
          rank: idx + 1,
        };

        return (
          <ProductCard
            key={product.asin || idx}
            idx={idx}
            product={normalizedProduct}
          />
        );
      })}
    </div>
  );
};

export default ProductRecommendations;
