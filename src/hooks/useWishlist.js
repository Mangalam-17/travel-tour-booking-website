import { useState, useEffect } from 'react';

const WISHLIST_KEY = 'travel_wishlist';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (tourId) => {
    setWishlist((prev) => [...prev, tourId]);
  };

  const removeFromWishlist = (tourId) => {
    setWishlist((prev) => prev.filter((id) => id !== tourId));
  };

  const toggleWishlist = (tourId) => {
    if (wishlist.includes(tourId)) {
      removeFromWishlist(tourId);
    } else {
      addToWishlist(tourId);
    }
  };

  const isWishlisted = (tourId) => wishlist.includes(tourId);

  return { wishlist, toggleWishlist, isWishlisted };
};
