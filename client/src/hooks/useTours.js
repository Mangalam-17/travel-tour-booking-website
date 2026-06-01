import { useState, useEffect } from 'react';
import apiFetch from '../lib/api';

/**
 * Fetch all tours with optional filters — sent as query params to Express.
 */
export const useTours = (filters = {}) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (filters.search)                          params.set('search',   filters.search);
        if (filters.tourType && filters.tourType !== 'All') params.set('tourType', filters.tourType);
        if (filters.priceRange) {
          params.set('minPrice', filters.priceRange[0]);
          params.set('maxPrice', filters.priceRange[1]);
        }
        if (filters.rating && filters.rating > 0)   params.set('rating',   filters.rating);
        if (filters.sortBy)                          params.set('sortBy',   filters.sortBy);

        const query = params.toString() ? `?${params.toString()}` : '';
        const res = await apiFetch(`/api/tours${query}`);
        setTours(res.data || []);
      } catch (err) {
        console.error('useTours error:', err);
        setError(err.message || 'Failed to load tours');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [
    filters.search,
    filters.tourType,
    filters.priceRange?.[0],
    filters.priceRange?.[1],
    filters.rating,
    filters.sortBy,
  ]);

  return { tours, loading, error };
};

/**
 * Fetch a single tour by MongoDB _id string.
 */
export const useTour = (id) => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiFetch(`/api/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error('useTour error:', err);
        setError(err.message || 'Tour not found');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  return { tour, loading, error };
};
