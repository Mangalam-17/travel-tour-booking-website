import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMap, FiPlus, FiEdit2, FiTrash2, FiAlertTriangle, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import apiFetch from '../../lib/api';
import { formatPrice } from '../../utils/helpers';

const tourTypeColors = {
  Adventure: 'bg-emerald-100 text-emerald-700',
  Heritage:  'bg-amber-100 text-amber-700',
  Family:    'bg-blue-100 text-blue-700',
  Honeymoon: 'bg-pink-100 text-pink-700',
  Beach:     'bg-cyan-100 text-cyan-700',
  Wildlife:  'bg-orange-100 text-orange-700',
  Spiritual: 'bg-purple-100 text-purple-700',
};

// ── Delete confirmation modal ────────────────────────────────────
const DeleteModal = ({ tour, onConfirm, onCancel, loading }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
    onClick={onCancel}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
          <FiAlertTriangle className="text-red-500 text-xl" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Delete Tour</h3>
          <p className="text-slate-500 text-sm mt-1">
            Are you sure you want to delete <strong>{tour?.title}</strong>? This action cannot be undone.
          </p>
        </div>
        <button onClick={onCancel} className="ml-auto text-slate-400 hover:text-slate-600">
          <FiX />
        </button>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : 'Delete Tour'}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// ── Main component ───────────────────────────────────────────────
const AdminTours = () => {
  const { getToken } = useAuth();
  const [tours, setTours]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/tours', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTours(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load tours');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => { fetchTours(); }, [fetchTours]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await apiFetch(`/api/admin/tours/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTours((prev) => prev.filter((t) => t._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message || 'Failed to delete tour');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-6 gap-4 flex-wrap"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <FiMap className="text-orange-500 text-2xl" />
            <h1 className="text-2xl font-bold text-slate-800">Tours</h1>
          </div>
          <p className="text-slate-500 text-sm">
            {!loading && <span className="font-medium text-slate-700">{tours.length}</span>} tour packages
          </p>
        </div>
        <Link
          to="/admin/tours/new"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/30"
        >
          <FiPlus />
          Add New Tour
        </Link>
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
        ) : tours.length === 0 ? (
          <div className="py-16 text-center">
            <FiMap className="text-slate-300 text-5xl mx-auto mb-3" />
            <p className="text-slate-400 font-medium">No tours yet</p>
            <Link to="/admin/tours/new" className="text-orange-500 text-sm mt-2 inline-block hover:underline">
              Add your first tour
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tour</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tours.map((tour, idx) => (
                  <motion.tr
                    key={tour._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {/* Tour with thumbnail */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={tour.images?.[0]}
                          alt={tour.title}
                          className="w-12 h-10 rounded-lg object-cover shrink-0 bg-slate-100"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/48x40?text=No+Image'; }}
                        />
                        <p className="text-sm font-semibold text-slate-800 max-w-[180px] truncate">{tour.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-600">{tour.destination}, {tour.country}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${tourTypeColors[tour.tourType] || 'bg-slate-100 text-slate-600'}`}>
                        {tour.tourType}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-600 whitespace-nowrap">{tour.duration}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800 whitespace-nowrap">{formatPrice(tour.price)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        <span className="text-sm font-medium text-slate-700">{tour.rating}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/tours/${tour._id}/edit`}
                          className="p-2 rounded-lg text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 className="text-base" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(tour)}
                          className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="text-base" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            tour={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleteLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTours;
