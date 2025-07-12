"use client";
import React, { useEffect, useState } from "react";
import ShopHeader from "@/components/Shop/ShopHeader";
import ShopSearchBar from "@/components/Shop/ShopSearchBar";
import ProductRecommendations from "@/components/Shop/ProductRecommendations";
import { useUser } from "@clerk/nextjs";

const ShopPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;


  const searchProducts = (query: string) => {
    setLoading(true);

    // Simulate an API call to fetch products based on the query


    setTimeout(() => setLoading(false), 1000);
  }

  useEffect(() => {
    if (shoppingList.length > 0) {
      setLoading(true);

      // Simulate fetching products based on the shopping list

      setLoading(false);
    }
  }, [shoppingList]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log("User is signed in:", user);
      const fetchShoppingList = async () => {
        try {
          const res = await fetch(`/api/cart?userId=${user.id}`);
          if (!res.ok) throw new Error("Failed to fetch shopping list");
          const data = await res.json();
          setShoppingList(data.slice(0, 10));
        } catch (error) {
          console.error("Error fetching shopping list:", error);
        }
      };

      fetchShoppingList();
    }
  }, [user, isLoaded, isSignedIn]);

  return (
    <div className="flex flex-col items-center pt-8">
      <ShopHeader />
      <ShopSearchBar query={query} setQuery={setQuery} searchProducts={searchProducts} />
      <div className="w-full max-w-5xl mx-auto mt-8">
        <ProductRecommendations
          isSignedIn={isSignedIn}
          query={query}
          shoppingList={shoppingList}
          loading={loading}
          products={products}
        />
      </div>
    </div>
  );
};

export default ShopPage;