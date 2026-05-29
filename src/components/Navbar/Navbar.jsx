import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHeart, FiGlobe } from 'react-icons/fi';
import { useWishlist } from '../../hooks/useWishlist';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { wishlist } = useWishlist();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navBg = isHome
    ? scrolled
      ? 'bg-white shadow-lg'
      : 'bg-transparent'
    : 'bg-white shadow-lg';

  const textColor = isHome && !scrolled ? 'text-white' : 'text-slate-800';
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-orange-500';

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
              <FiGlobe className="text-white text-xl" />
            </div>
            <span className={`text-xl font-bold ${logoColor} transition-colors duration-300`}>
              Roam<span className="text-orange-500">ly</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 hover:text-orange-500 ${
                    isActive ? 'text-orange-500' : textColor
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/destinations"
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <FiHeart className={`text-xl ${textColor}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/destinations"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Explore Tours
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${textColor}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-orange-50 text-orange-500'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  to="/destinations"
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <span>Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/destinations"
                  className="block mt-2 bg-orange-500 text-white text-center px-4 py-3 rounded-xl text-sm font-semibold"
                >
                  Explore Tours
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
