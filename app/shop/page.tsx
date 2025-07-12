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
    const productBasedOnQuery = async () => {
      try {
        const res = await fetch(`${backend_url}/products?query=${query}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }
    productBasedOnQuery();

    setLoading(false);
  }

  useEffect(() => {
    if (shoppingList.length > 0 && products.length === 0 && query === "") {
      setLoading(true);
      console.log("Fetching products based on shopping list...");

      // Simulate fetching products based on the shopping list
      const fetchProductsBasedOnShoppingList = async () => {
        try {
          const res = await fetch(`${backend_url}/products?shoppingList=${JSON.stringify(shoppingList)}`);
          if (!res.ok) throw new Error("Failed to fetch products");
          const data = await res.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
          setProducts([]);
        }
      };
      fetchProductsBasedOnShoppingList(); 

      setLoading(false);
    }
  }, [shoppingList]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
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
      <ShopSearchBar setQuery={setQuery} searchProducts={searchProducts} />
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