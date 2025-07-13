import React, { useRef } from "react";
import { Search } from "lucide-react";

interface ShopSearchBarProps {
  setQuery: (query: string) => void;
  searchProducts: (query: string) => void;
}

const ShopSearchBar = ({ setQuery, searchProducts }: ShopSearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = inputRef.current?.value || "";
    setQuery(searchQuery);
    searchProducts(searchQuery);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-center w-full max-w-2xl mx-auto"
    >
      <input
        type="text"
        ref={inputRef}
        placeholder="Describe the product you want..."
        className="flex-1 px-4 py-3 rounded-l-xl border border-purple-300 focus:ring-1 focus:ring-purple-400 text-base bg-white"
      />
      <button
        type="submit"
        className="cursor-pointer px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-r-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
      >
        <Search className="inline w-6 h-6 mr-2" />
        Search
      </button>
    </form>
  );
};

export default ShopSearchBar;
