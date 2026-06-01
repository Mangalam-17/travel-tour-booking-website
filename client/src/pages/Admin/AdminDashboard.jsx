import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiDollarSign,
  FiMail,
  FiUsers,
  FiMap,
  FiTrendingUp,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import apiFetch from '../../lib/api';
import { formatPrice } from '../../utils/helpers';

const statusConfig = {
  confirmed: { label: 'Confirmed', classes: 'bg-green-100 text-green-700' },
  pending: { label: 'Pending', classes: 'bg-yellow-100 text-yellow-700' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-700' },
};

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-5"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon className="text-2xl text-white" />
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <p className="text-slate-800 text-2xl font-bold mt-0.5">{value}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const { getToken } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await apiFetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setStats(res.data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [getToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      icon: FiCalendar,
      label: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      color: 'bg-orange-500',
      delay: 0,
    },
    {
      icon: FiDollarSign,
      label: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      color: 'bg-green-500',
      delay: 0.05,
    },
    {
      icon: FiMail,
      label: 'New Messages',
      value: stats.unreadContacts.toLocaleString(),
      color: 'bg-blue-500',
      delay: 0.1,
    },
    {
      icon: FiUsers,
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      color: 'bg-purple-500',
      delay: 0.15,
    },
    {
      icon: FiMap,
      label: 'Total Tours',
      value: stats.totalTours.toLocaleString(),
      color: 'bg-teal-500',
      delay: 0.2,
    },
  ];

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <FiTrendingUp className="text-orange-500 text-2xl" />
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        </div>
        <p className="text-slate-500 text-sm">Welcome back! Here's what's happening with Roamly.</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Recent bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100"
      >
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Recent Bookings</h2>
          <p className="text-slate-500 text-sm mt-0.5">Last 5 bookings made on the platform</p>
        </div>

        {stats.recentBookings.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">No bookings yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tour</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Traveler</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guests</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats.recentBookings.map((booking) => {
                  const cfg = statusConfig[booking.status] || statusConfig.pending;
                  return (
                    <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800 max-w-[180px] truncate">
                          {booking.tourTitle}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{booking.fullName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {new Date(booking.travelDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">{booking.guests}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-800">
                          {formatPrice(booking.totalAmount)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.classes}`}>
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
