import { motion } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

const tourTypes = ['All', 'Adventure', 'Heritage', 'Family', 'Honeymoon', 'Beach', 'Wildlife', 'Spiritual'];
const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const Filters = ({ filters, onFilterChange, onReset, resultCount }) => {
  const { tourType, priceRange, rating, sortBy } = filters;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FiFilter className="text-orange-500" />
          <h3 className="font-semibold text-slate-800">Filters</h3>
          {resultCount !== undefined && (
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
              {resultCount} tours
            </span>
          )}
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-orange-500 flex items-center gap-1 transition-colors"
        >
          <FiX className="text-sm" /> Reset
        </button>
      </div>

      {/* Sort */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
          Sort By
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Tour Type */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
          Tour Type
        </label>
        <div className="flex flex-wrap gap-2">
          {tourTypes.map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange('tourType', type)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
                tourType === type
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
          Max Price: <span className="text-orange-500">₹{priceRange[1].toLocaleString('en-IN')}</span>
        </label>
        <input
          type="range"
          min={5000}
          max={50000}
          step={1000}
          value={priceRange[1]}
          onChange={(e) => onFilterChange('priceRange', [priceRange[0], Number(e.target.value)])}
          className="w-full accent-orange-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>₹5,000</span>
          <span>₹50,000</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
          Min Rating
        </label>
        <div className="flex gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => onFilterChange('rating', r)}
              className={`flex-1 text-xs py-2 rounded-xl font-medium transition-all duration-200 ${
                rating === r
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {r === 0 ? 'All' : `${r}+`}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Filters;
