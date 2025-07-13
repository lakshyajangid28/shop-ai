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
        const res = await fetch(`${backend_url}/search-products?query=${query}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        console.log("Fetched products:", data);
        // setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }
    productBasedOnQuery();

    setLoading(false);
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      if (isLoaded && isSignedIn && user) {
        try {
          // 1. Fetch shopping list
          const res = await fetch(`/api/cart?userId=${user.id}`);
          if (!res.ok) throw new Error("Failed to fetch shopping list");
          const shoppingListData = await res.json();

          setShoppingList(shoppingListData);

          // 2. If shopping list exists, fetch products
          if (shoppingListData.length > 0) {

            const transcript = `Based on the following shopping list, recommend similar products that the user might be interested in:\n\n` +
              shoppingList.map((item, index) =>
                `${index + 1}. "${item.title}" – Price: ${item.price}`
              ).join('\n') +
              `\n\nPlease provide product suggestions that align with the style, purpose, or category of these items.`;

            const productRes = await fetch(`${backend_url}/shop-products`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                transcript: transcript,
                messageHistory: [],
              }),
            });
            if (!productRes.ok) throw new Error("Failed to fetch products");
            const productData = await productRes.json();
            setProducts(productData.data);
          } else {
            setProducts([]);
          }
        } catch (error) {
          console.error("Error loading data:", error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
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