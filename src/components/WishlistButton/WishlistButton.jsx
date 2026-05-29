import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useWishlist } from '../../hooks/useWishlist';

const WishlistButton = ({ tourId, className = '' }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(tourId);

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(tourId);
      }}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
        wishlisted
          ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
          : 'bg-white/90 text-slate-600 hover:bg-red-50 hover:text-red-500'
      } ${className}`}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {wishlisted ? (
        <FaHeart className="text-sm" />
      ) : (
        <FiHeart className="text-sm" />
      )}
    </motion.button>
  );
};

export default WishlistButton;
