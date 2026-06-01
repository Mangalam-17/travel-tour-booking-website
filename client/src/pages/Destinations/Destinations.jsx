import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiSliders, FiX } from 'react-icons/fi';
import TourCard from '../../components/TourCard/TourCard';
import SkeletonCard from '../../components/TourCard/SkeletonCard';
import Filters from '../../components/Filters/Filters';
import { useTours } from '../../hooks/useTours';

const defaultFilters = {
  search: '',
  tourType: 'All',
  priceRange: [0, 50000],
  rating: 0,
  sortBy: 'default',
};

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...defaultFilters,
    search: searchParams.get('search') || '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const { tours: filteredTours, loading } = useTours(filters);
  const totalCount = filteredTours.length;

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setFilters((prev) => ({ ...prev, search: q }));
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setFilters(defaultFilters);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              All Packages
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore Our Tour Packages
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Discover handcrafted tours across the world's most beautiful destinations.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search destinations, tour names..."
                className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
              {filters.search && (
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <FiX />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm"
          >
            <FiSliders className="text-orange-500" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 shrink-0`}>
            <div className="sticky top-24">
              <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                resultCount={filteredTours.length}
              />
            </div>
          </aside>

          {/* Tour Grid */}
          <div className="flex-1 min-w-0">
            {!loading && (
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-600 text-sm">
                  Showing <strong>{filteredTours.length}</strong> tours
                </p>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array(9).fill(0).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filteredTours.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No tours found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your filters or search terms.</p>
                <button
                  onClick={handleReset}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour, i) => (
                  <TourCard key={tour._id} tour={tour} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
