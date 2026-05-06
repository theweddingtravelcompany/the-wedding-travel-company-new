import { useState, useEffect } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  location: string;
  priceFrom?: string;
  image: string;
  url: string;
}

const WISHLIST_KEY = 'twtc_wishlist';

// Helper to get from localstorage
export const getWishlist = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Helper to set to localstorage and dispatch event
export const saveWishlist = (items: WishlistItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('wishlist_updated'));
  }
};

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setItems(getWishlist());
    
    const handleUpdate = () => {
      setItems(getWishlist());
    };
    
    window.addEventListener('wishlist_updated', handleUpdate);
    return () => window.removeEventListener('wishlist_updated', handleUpdate);
  }, []);

  const addItem = (item: WishlistItem) => {
    const current = getWishlist();
    if (!current.some(i => i.id === item.id)) {
      saveWishlist([...current, item]);
    }
  };

  const removeItem = (id: string) => {
    const current = getWishlist();
    saveWishlist(current.filter(i => i.id !== id));
  };

  const clearWishlist = () => {
    saveWishlist([]);
  };

  const isInWishlist = (id: string) => {
    return items.some(i => i.id === id);
  };

  return {
    items,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist
  };
};