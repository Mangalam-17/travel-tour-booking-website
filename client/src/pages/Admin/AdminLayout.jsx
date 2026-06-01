import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiCalendar,
  FiMail,
  FiUsers,
  FiGlobe,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: FiGrid, end: true },
  { label: 'Bookings', path: '/admin/bookings', icon: FiCalendar },
  { label: 'Contacts', path: '/admin/contacts', icon: FiMail },
  { label: 'Users', path: '/admin/users', icon: FiUsers },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-400 transition-colors">
            <FiGlobe className="text-white text-xl" />
          </div>
          <div>
            <span className="text-white text-lg font-bold group-hover:text-orange-300 transition-colors">
              Roam<span className="text-orange-400">ly</span>
            </span>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        </Link>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="ml-auto lg:hidden text-slate-400 hover:text-white transition-colors"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      {/* Admin info */}
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-orange-400 text-xs font-medium">Administrator</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="text-lg flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {isActive && <FiChevronRight className="text-sm opacity-70" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <FiLogOut className="text-lg flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-800 min-h-screen flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-64 bg-slate-800 z-50 lg:hidden flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-4 bg-white border-b border-slate-200 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <FiMenu className="text-xl" />
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center group-hover:bg-orange-400 transition-colors">
              <FiGlobe className="text-white text-sm" />
            </div>
            <span className="text-slate-800 font-bold group-hover:text-orange-500 transition-colors">
              Roam<span className="text-orange-500">ly</span>
              <span className="text-slate-400 font-normal text-sm ml-1">Admin</span>
            </span>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
