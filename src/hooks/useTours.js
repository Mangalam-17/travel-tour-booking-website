import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Fetch all tours with optional filters applied server-side.
 * Falls back to client-side filtering for priceRange since
 * Supabase range queries need both min and max.
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
        let query = supabase
          .from('tours')
          .select(`
            id, title, destination, country, images,
            description, price, rating, duration, tour_type,
            highlights, facilities,
            itinerary ( id, day, title, description ),
            reviews ( id, name, avatar, rating, comment, date )
          `);

        // Search filter
        if (filters.search) {
          query = query.or(
            `title.ilike.%${filters.search}%,destination.ilike.%${filters.search}%,country.ilike.%${filters.search}%`
          );
        }

        // Tour type filter
        if (filters.tourType && filters.tourType !== 'All') {
          query = query.eq('tour_type', filters.tourType);
        }

        // Price range filter
        if (filters.priceRange) {
          query = query
            .gte('price', filters.priceRange[0])
            .lte('price', filters.priceRange[1]);
        }

        // Min rating filter
        if (filters.rating && filters.rating > 0) {
          query = query.gte('rating', filters.rating);
        }

        // Sorting
        switch (filters.sortBy) {
          case 'price-asc':
            query = query.order('price', { ascending: true });
            break;
          case 'price-desc':
            query = query.order('price', { ascending: false });
            break;
          case 'rating':
            query = query.order('rating', { ascending: false });
            break;
          default:
            query = query.order('id', { ascending: true });
        }

        const { data, error: sbError } = await query;

        if (sbError) throw sbError;

        // Normalize snake_case → camelCase for tour_type
        const normalized = (data || []).map(normalizeTour);
        setTours(normalized);
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
 * Fetch a single tour by numeric id, including itinerary + reviews.
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
        const { data, error: sbError } = await supabase
          .from('tours')
          .select(`
            *,
            itinerary ( id, day, title, description ),
            reviews ( id, name, avatar, rating, comment, date )
          `)
          .eq('id', id)
          .single();

        if (sbError) throw sbError;

        setTour(normalizeTour(data));
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

// Map DB snake_case fields → camelCase used throughout the app
const normalizeTour = (t) => ({
  ...t,
  tourType: t.tour_type,
  // Sort itinerary by day number
  itinerary: (t.itinerary || []).sort((a, b) => a.day - b.day),
});
