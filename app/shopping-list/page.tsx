"use client";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import ShoppingList, { ShoppingListItem } from '@/components/Cart/ShoppingList';
import ShoppingListSummary from '@/components/Cart/ShoppingListSummary';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

export default function Cart() {
    const { isSignedIn, isLoaded, user } = useUser();
    const router = useRouter();
    const [items, setItems] = useState<ShoppingListItem[]>([]);
    const [loading, setLoading] = useState(true);
    console.log(items);
    // Fetch cart items
    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            setLoading(true);
            fetch(`/api/cart?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setItems(data))
                .catch(() => Swal.fire("Error", "Failed to load cart.", "error"))
                .finally(() => setLoading(false));
        }
    }, [isLoaded, isSignedIn, user]);

    // Redirect if not signed in
    if (isLoaded && !isSignedIn) {
        Swal.fire({
            title: 'Access Denied!',
            text: 'You must be signed in to view your shopping list.',
            icon: 'error',
        });
        router.push('/login');
        return null;
    }
    if (!isLoaded) return null;

    const handleRemove = async (link: string) => {
        if (!isLoaded || !isSignedIn || !user) return;
        await fetch(`/api/cart?userId=${user.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ link }),
        });
        setItems(prev => prev.filter(item => item.link !== link));
        Swal.fire("Removed!", "Item removed from your shopping list.", "success");
    };

    const parsePrice = (price: string) => {
        if (!price) return 0;
        const match = price.match(/([\d,.]+)/);
        return match ? parseFloat(match[1].replace(/,/g, '')) : 0;
    };
    const total = items.reduce((sum, item) => sum + parsePrice(item.price), 0);
    const itemCount = items.length;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
                <span className="inline-block align-middle mr-2">
                    <svg
                        className="w-10 h-10 inline-block text-blue-600 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6h13"
                        />
                    </svg>
                </span>
                Your Shopping List
            </h1>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <>
                    <ShoppingList items={items} onRemove={handleRemove} />
                    <ShoppingListSummary total={total} itemCount={itemCount} />
                    <div className="mt-12 text-center text-gray-500 text-sm animate-fade-in">
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full shadow">
                            <svg
                                className="w-5 h-5 text-blue-500 animate-spin"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v4m0 8v4m8-8h-4M4 12H8m9.07-4.93l-2.83 2.83m0 6.34l2.83 2.83M6.34 6.34l2.83 2.83m0 6.34l-2.83 2.83"
                                />
                            </svg>
                            Add products from any site and manage your universal shopping list here!
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}