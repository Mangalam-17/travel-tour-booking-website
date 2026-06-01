import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiStar, FiArrowRight } from 'react-icons/fi';
import WishlistButton from '../WishlistButton/WishlistButton';
import { formatPrice } from '../../utils/helpers';

const tourTypeColors = {
  Adventure: 'bg-emerald-100 text-emerald-700',
  Heritage: 'bg-amber-100 text-amber-700',
  Family: 'bg-blue-100 text-blue-700',
  Honeymoon: 'bg-pink-100 text-pink-700',
  Beach: 'bg-cyan-100 text-cyan-700',
  Wildlife: 'bg-orange-100 text-orange-700',
  Spiritual: 'bg-purple-100 text-purple-700',
};

const TourCard = ({ tour, index = 0 }) => {
  const { _id, title, destination, country, images, price, rating, duration, tourType } = tour;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Tour Type Badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${tourTypeColors[tourType] || 'bg-slate-100 text-slate-700'}`}>
          {tourType}
        </span>

        {/* Wishlist */}
        <div className="absolute top-3 right-3">
          <WishlistButton tourId={_id} />
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <FiStar className="text-amber-400 fill-amber-400 text-xs" />
          <span className="text-xs font-bold text-slate-800">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
          <FiMapPin className="text-orange-500 shrink-0" />
          <span>{destination}, {country}</span>
        </div>

        <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
          <FiClock className="text-orange-500 shrink-0" />
          <span>{duration}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400">Starting from</span>
            <div className="text-xl font-bold text-orange-500">{formatPrice(price)}</div>
            <span className="text-xs text-slate-400">per person</span>
          </div>
          <Link
            to={`/tour/${_id}`}
            className="group/btn flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
          >
            View Details
            <FiArrowRight className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
