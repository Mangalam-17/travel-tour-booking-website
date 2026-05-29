import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiSliders } from 'react-icons/fi';

const popularSearches = ['Bali', 'Maldives', 'Switzerland', 'Japan', 'Greece'];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/destinations?search=${encodeURIComponent(query)}`);
  };

  const handleQuickSearch = (term) => {
    navigate(`/destinations?search=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative z-20 -mt-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/80 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FiSearch className="text-orange-500" />
            Find Your Perfect Tour
          </h2>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, tours..."
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 shrink-0"
            >
              <FiSearch />
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <FiSliders className="text-orange-500" /> Popular:
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleQuickSearch(term)}
                className="text-xs bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 px-3 py-1.5 rounded-full transition-colors duration-200 font-medium"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SearchBar;
