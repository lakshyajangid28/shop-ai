"use client";
import React from "react";
import ShopHeader from "@/components/Shop/ShopHeader";
// import ShopSearchBar from "@/components/Shop/ShopSearchBar";
// import ProductRecommendations from "@/components/Shop/ProductRecommendations";
import { useUser } from "@clerk/nextjs";
// import useShoppingList from "@/hooks/useShoppingList";

const ShopPage = () => {
  const { isSignedIn } = useUser();
  // const { shoppingList } = useShoppingList();

  return (
    <div className="flex flex-col items-center pt-8 min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <ShopHeader />
      {/* <ShopSearchBar /> */}
      {/* <div className="w-full max-w-5xl mx-auto mt-8">
        <ProductRecommendations
          isSignedIn={isSignedIn}
          shoppingList={shoppingList}
        />
      </div> */}
    </div>
  );
};

export default ShopPage;