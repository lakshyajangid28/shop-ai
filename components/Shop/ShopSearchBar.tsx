import React, { useState } from "react";
import { Search } from "lucide-react";
import useProductSearch from "@/hooks/useProductSearch";

const ShopSearchBar = () => {
  const [query, setQuery] = useState("");
  const { searchProducts } = useProductSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-center w-full max-w-2xl mx-auto"
    >
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Describe the product you want..."
        className="flex-1 px-4 py-3 rounded-l-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 text-base bg-white"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-r-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
      >
        <Search className="inline w-5 h-5 mr-2" />
        Search
      </button>
    </form>
  );
};

export default ShopSearchBar;