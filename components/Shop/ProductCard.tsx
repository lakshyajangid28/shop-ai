import React from "react";

const ProductCard = ({ product }: any) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
    <img
      src={product.image || "/images/default-product.png"}
      alt={product.name}
      className="w-32 h-32 object-cover rounded-xl mb-4"
    />
    <h2 className="text-xl font-bold text-purple-700 mb-2">{product.name}</h2>
    <p className="text-gray-600 mb-4 text-center">{product.description}</p>
    <div className="flex gap-3 mt-auto">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
        Add to Shopping List
      </button>
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition"
      >
        Where to Buy
      </a>
    </div>
  </div>
);

export default ProductCard;