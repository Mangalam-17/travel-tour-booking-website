import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useWishlist = () => {
  const { user } = useAuth();

  // Key is user-specific — guests get no wishlist
  const storageKey = user?._id ? `roamly_wishlist_${user._id}` : null;

  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage whenever the logged-in user changes
  useEffect(() => {
    if (!storageKey) {
      setWishlist([]); // not logged in → empty
      return;
    }
    try {
      const stored = localStorage.getItem(storageKey);
      setWishlist(stored ? JSON.parse(stored) : []);
    } catch {
      setWishlist([]);
    }
  }, [storageKey]);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, storageKey]);

  const addToWishlist = (tourId) => {
    if (!storageKey) return; // silently ignore if not logged in
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
