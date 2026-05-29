export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

export const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  if (hasHalf) stars.push('half');
  while (stars.length < 5) stars.push('empty');

  return stars;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const filterTours = (tours, filters) => {
  return tours.filter((tour) => {
    const { search, priceRange, rating, tourType } = filters;

    if (search) {
      const q = search.toLowerCase();
      if (
        !tour.title.toLowerCase().includes(q) &&
        !tour.destination.toLowerCase().includes(q) &&
        !tour.country.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    if (priceRange) {
      const [min, max] = priceRange;
      if (tour.price < min || tour.price > max) return false;
    }

    if (rating && tour.rating < rating) return false;

    if (tourType && tourType !== 'All' && tour.tourType !== tourType) return false;

    return true;
  });
};

export const sortTours = (tours, sortBy) => {
  const sorted = [...tours];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};
