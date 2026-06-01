import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiChevronDown, FiChevronUp, FiCheck, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import apiFetch from '../../lib/api';

const statusConfig = {
  unread: { label: 'Unread', classes: 'bg-blue-100 text-blue-700' },
  read: { label: 'Read', classes: 'bg-slate-100 text-slate-600' },
  replied: { label: 'Replied', classes: 'bg-green-100 text-green-700' },
};

const FILTERS = ['All', 'Unread', 'Read', 'Replied'];

const AdminContacts = () => {
  const { getToken } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setContacts(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await apiFetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: res.data.status } : c))
      );
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const unreadCount = contacts.filter((c) => c.status === 'unread').length;

  const filtered = contacts.filter((c) => {
    if (filter === 'All') return true;
    return c.status === filter.toLowerCase();
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
          <FiMail className="text-orange-500 text-2xl" />
          <h1 className="text-2xl font-bold text-slate-800">Contacts</h1>
          {unreadCount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm">
          {!loading && <span className="font-medium text-slate-700">{contacts.length}</span>} messages from visitors
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex gap-2 mb-5 flex-wrap"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              filter === f
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-500'
            }`}
          >
            {f}
            {f === 'Unread' && unreadCount > 0 && (
              <span className={`ml-1.5 text-xs font-bold ${filter === f ? 'text-white/80' : 'text-orange-500'}`}>
                ({unreadCount})
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Contacts list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-3"
      >
        {loading ? (
          <div className="flex items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
            <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-500 font-medium bg-white rounded-2xl border border-slate-100">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
            No messages found.
          </div>
        ) : (
          filtered.map((contact) => {
            const cfg = statusConfig[contact.status] || statusConfig.unread;
            const isExpanded = expandedId === contact._id;
            const isUpdating = updatingId === contact._id;

            return (
              <div
                key={contact._id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  contact.status === 'unread'
                    ? 'border-blue-200 shadow-sm shadow-blue-100'
                    : 'border-slate-100'
                }`}
              >
                {/* Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : contact._id)}
                  className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 font-bold text-sm">
                      {contact.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-semibold ${contact.status === 'unread' ? 'text-slate-900' : 'text-slate-700'}`}>
                        {contact.name}
                      </p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.classes}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{contact.email}</p>
                    <p className={`text-sm mt-1 ${contact.status === 'unread' ? 'font-medium text-slate-800' : 'text-slate-600'}`}>
                      {contact.subject}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5 truncate">
                      {contact.message}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <p className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    {isExpanded ? (
                      <FiChevronUp className="text-slate-400" />
                    ) : (
                      <FiChevronDown className="text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-slate-100">
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                          <div className="bg-slate-50 rounded-xl p-3">
                            <p className="text-xs text-slate-500 font-medium mb-1">Phone</p>
                            <p className="text-sm text-slate-700">{contact.phone || '—'}</p>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-3">
                            <p className="text-xs text-slate-500 font-medium mb-1">Email</p>
                            <p className="text-sm text-slate-700">{contact.email}</p>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-3">
                            <p className="text-xs text-slate-500 font-medium mb-1">Subject</p>
                            <p className="text-sm text-slate-700">{contact.subject}</p>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 mb-4">
                          <p className="text-xs text-slate-500 font-medium mb-2">Full Message</p>
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {contact.message}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {contact.status !== 'read' && contact.status !== 'replied' && (
                            <button
                              onClick={() => handleStatusUpdate(contact._id, 'read')}
                              disabled={isUpdating}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 disabled:opacity-60 transition"
                            >
                              <FiCheck className="text-sm" />
                              Mark as Read
                            </button>
                          )}
                          {contact.status !== 'replied' && (
                            <button
                              onClick={() => handleStatusUpdate(contact._id, 'replied')}
                              disabled={isUpdating}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 disabled:opacity-60 transition"
                            >
                              <FiMessageSquare className="text-sm" />
                              Mark as Replied
                            </button>
                          )}
                          {contact.status !== 'unread' && (
                            <button
                              onClick={() => handleStatusUpdate(contact._id, 'unread')}
                              disabled={isUpdating}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 disabled:opacity-60 transition"
                            >
                              Mark as Unread
                            </button>
                          )}
                          {isUpdating && (
                            <div className="w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </motion.div>
    </div>
  );
};

export default AdminContacts;
