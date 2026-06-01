import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import apiFetch from '../../lib/api';
import { formatPrice } from '../../utils/helpers';

const statusConfig = {
  confirmed: { label: 'Confirmed', classes: 'bg-green-100 text-green-700' },
  pending: { label: 'Pending', classes: 'bg-yellow-100 text-yellow-700' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-700' },
};

const AdminBookings = () => {
  const { getToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = useCallback(async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/admin/bookings?page=${currentPage}&limit=15`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setBookings(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchBookings(page);
  }, [fetchBookings, page]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await apiFetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: res.data.status } : b))
      );
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.fullName?.toLowerCase().includes(q) ||
      b.tourTitle?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <FiCalendar className="text-orange-500 text-2xl" />
          <h1 className="text-2xl font-bold text-slate-800">Bookings</h1>
        </div>
        <p className="text-slate-500 text-sm">
          Manage all tour bookings.{' '}
          {!loading && (
            <span className="font-medium text-slate-700">{pagination.total} total</span>
          )}
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="mb-4"
      >
        <div className="relative max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, tour or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-500 font-medium">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tour</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Traveler</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Travel Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guests</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Booked On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((booking) => {
                  const cfg = statusConfig[booking.status] || statusConfig.pending;
                  const isUpdating = updatingId === booking._id;
                  return (
                    <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-800 max-w-[160px] truncate">
                          {booking.tourTitle}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700 whitespace-nowrap">{booking.fullName}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600 max-w-[160px] truncate">{booking.email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600 whitespace-nowrap">{booking.phone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600 whitespace-nowrap">
                          {new Date(booking.travelDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600">{booking.guests}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                          {formatPrice(booking.totalAmount)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={booking.status}
                          disabled={isUpdating}
                          onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition disabled:opacity-60 ${cfg.classes}`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-500 whitespace-nowrap">
                          {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {!loading && !error && pagination.pages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-500">
            Page {page} of {pagination.pages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
