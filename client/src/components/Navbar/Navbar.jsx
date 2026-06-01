import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiHeart, FiGlobe,
  FiLogOut, FiLogIn, FiSettings,
  FiUser, FiChevronDown,
} from 'react-icons/fi';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// ── Avatar Dropdown ──────────────────────────────────────────────
const UserDropdown = ({ user, isAdmin, logout, textColor }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/');
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 focus:outline-none group"
        aria-label="User menu"
      >
        {/* Avatar circle */}
        <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:ring-2 group-hover:ring-orange-400 transition-all">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <FiChevronDown
          className={`text-sm transition-transform duration-200 ${open ? 'rotate-180' : ''} ${textColor}`}
        />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            {/* User info header */}
            <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1.5">
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <FiSettings className="text-orange-500 shrink-0" />
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <FiLogOut className="text-red-400 shrink-0" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main Navbar ──────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { wishlist } = useWishlist();
  const { isLoggedIn, user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
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
    ? scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
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
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
              <FiGlobe className="text-white text-xl" />
            </div>
            <span className={`text-xl font-bold ${logoColor} transition-colors duration-300`}>
              Roam<span className="text-orange-500">ly</span>
            </span>
          </Link>

          {/* Desktop nav links */}
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

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Wishlist */}
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

            {/* Auth section */}
            {isLoggedIn ? (
              <UserDropdown
                user={user}
                isAdmin={isAdmin}
                logout={logout}
                textColor={textColor}
              />
            ) : (
              <Link
                to="/login"
                className={`flex items-center gap-1.5 text-sm font-medium ${textColor} hover:text-orange-500 transition-colors`}
              >
                <FiLogIn />
                Login
              </Link>
            )}

            {/* CTA */}
            <Link
              to="/destinations"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Explore Tours
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${textColor}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col items-center gap-2">
              {/* Nav links */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `w-full text-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-orange-50 text-orange-500' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="w-full border-t border-slate-100 pt-3 flex flex-col items-center gap-2">
                {/* Wishlist */}
                <Link
                  to="/destinations"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                {isLoggedIn ? (
                  <>
                    {/* User info */}
                    <div className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                      <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                      </div>
                    </div>

                    {/* Admin link */}
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100"
                      >
                        <FiSettings className="text-orange-500" />
                        Admin Dashboard
                      </Link>
                    )}

                    {/* Logout */}
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <FiLogIn className="text-orange-500" />
                    Login
                  </Link>
                )}

                {/* CTA */}
                <Link
                  to="/destinations"
                  className="block w-full bg-orange-500 text-white text-center px-4 py-3 rounded-xl text-sm font-semibold"
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
