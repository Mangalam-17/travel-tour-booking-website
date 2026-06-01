import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiMail, FiPhone, FiCalendar, FiUsers,
  FiCheckCircle, FiAlertCircle, FiCheck, FiX,
} from 'react-icons/fi';
import { formatPrice } from '../../utils/helpers';
import apiFetch from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

// ── Per-field validators ─────────────────────────────────────────
const validators = {
  fullName: (v) => {
    if (!v.trim()) return 'Full name is required';
    if (v.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(v)) return 'Enter a valid email address';
    return '';
  },
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required';
    const digits = v.replace(/\D/g, '');
    if (digits.length !== 10) return 'Phone number must be exactly 10 digits';
    return '';
  },
  travelDate: (v) => {
    if (!v) return 'Travel date is required';
    if (new Date(v) <= new Date()) return 'Date must be in the future';
    return '';
  },
  guests: (v) => {
    if (!v || Number(v) < 1) return 'At least 1 guest required';
    if (Number(v) > 20) return 'Maximum 20 guests allowed';
    return '';
  },
};

// ── Field status icon ────────────────────────────────────────────
const FieldStatus = ({ touched, error, value }) => {
  if (!touched || !value) return null;
  if (error) return <FiX className="text-red-500 text-sm" />;
  return <FiCheck className="text-green-500 text-sm" />;
};

// ── Input wrapper ────────────────────────────────────────────────
const fieldClass = (touched, error, value) => {
  const base = 'w-full pl-10 pr-9 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all';
  if (!touched || !value) return `${base} border-slate-200 focus:ring-orange-500/30 focus:border-orange-500`;
  if (error) return `${base} border-red-400 bg-red-50 focus:ring-red-500/20 focus:border-red-400`;
  return `${base} border-green-400 bg-green-50/30 focus:ring-green-500/20 focus:border-green-400`;
};

// ── Main component ───────────────────────────────────────────────
const BookingForm = ({ tour }) => {
  const { getToken } = useAuth();

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', travelDate: '', guests: 1,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const totalAmount = tour.price * form.guests;
  const today = new Date().toISOString().split('T')[0];

  // Validate a single field and update errors state
  const validateField = useCallback((name, value) => {
    const error = validators[name] ? validators[name](value) : '';
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  }, []);

  // onChange — validate immediately after first touch
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsed = name === 'guests' ? Number(value) : value;
    setForm((prev) => ({ ...prev, [name]: parsed }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // onBlur — mark as touched and validate
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Validate all fields on submit
  const validateAll = () => {
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const newErrors = {};
    Object.entries(form).forEach(([name, value]) => {
      const err = validators[name]?.(String(value)) || '';
      if (err) newErrors[name] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setLoading(true);
    setServerError('');
    try {
      await apiFetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          tourId: tour._id,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          travelDate: form.travelDate,
          guests: form.guests,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 shadow-lg text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="text-green-500 text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3">Booking Confirmed!</h3>
        <p className="text-slate-500 mb-6">
          Thank you, <strong>{form.fullName}</strong>! Your booking for{' '}
          <strong>{tour.title}</strong> has been received. A confirmation will be sent to{' '}
          <strong>{form.email}</strong>.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Tour</span>
            <span className="font-medium text-slate-800">{tour.title}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Travel Date</span>
            <span className="font-medium text-slate-800">
              {new Date(form.travelDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Guests</span>
            <span className="font-medium text-slate-800">{form.guests}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-slate-200 pt-2 mt-2">
            <span className="font-semibold text-slate-700">Total Paid</span>
            <span className="font-bold text-orange-500 text-lg">{formatPrice(totalAmount)}</span>
          </div>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ fullName: '', email: '', phone: '', travelDate: '', guests: 1 });
            setErrors({});
            setTouched({});
          }}
          className="text-sm text-orange-500 hover:text-orange-600 font-medium"
        >
          Make another booking
        </button>
      </motion.div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Summary header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
        <h3 className="font-bold text-lg mb-1">Booking Summary</h3>
        <p className="text-orange-100 text-sm mb-4">{tour.title}</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-orange-100">Price per person</span>
            <span className="font-semibold">{formatPrice(tour.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-orange-100">Guests</span>
            <span className="font-semibold">{form.guests}</span>
          </div>
          <div className="flex justify-between border-t border-orange-400 pt-2 mt-2">
            <span className="font-bold">Total Amount</span>
            <span className="font-bold text-xl">{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>

        {/* Full Name */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
            Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Rahul Sharma"
              className={fieldClass(touched.fullName, errors.fullName, form.fullName)}
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <FieldStatus touched={touched.fullName} error={errors.fullName} value={form.fullName} />
            </div>
          </div>
          <AnimatePresence>
            {touched.fullName && errors.fullName && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-red-500 text-xs mt-1 flex items-center gap-1"
              >
                <FiAlertCircle className="shrink-0" /> {errors.fullName}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="rahul@example.com"
              className={fieldClass(touched.email, errors.email, form.email)}
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <FieldStatus touched={touched.email} error={errors.email} value={form.email} />
            </div>
          </div>
          <AnimatePresence>
            {touched.email && errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-red-500 text-xs mt-1 flex items-center gap-1"
              >
                <FiAlertCircle className="shrink-0" /> {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
            Phone Number
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+91 98765 43210"
              maxLength={10}
              className={fieldClass(touched.phone, errors.phone, form.phone)}
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <FieldStatus touched={touched.phone} error={errors.phone} value={form.phone} />
            </div>
          </div>
          <AnimatePresence>
            {touched.phone && errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-red-500 text-xs mt-1 flex items-center gap-1"
              >
                <FiAlertCircle className="shrink-0" /> {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Travel Date & Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Travel Date */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Travel Date
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                name="travelDate"
                value={form.travelDate}
                min={today}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClass(touched.travelDate, errors.travelDate, form.travelDate)}
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                <FieldStatus touched={touched.travelDate} error={errors.travelDate} value={form.travelDate} />
              </div>
            </div>
            <AnimatePresence>
              {touched.travelDate && errors.travelDate && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <FiAlertCircle className="shrink-0" /> {errors.travelDate}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Guests */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Guests
            </label>
            <div className="relative">
              <FiUsers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                name="guests"
                value={form.guests}
                min={1}
                max={20}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClass(touched.guests, errors.guests, String(form.guests))}
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                <FieldStatus touched={touched.guests} error={errors.guests} value={String(form.guests)} />
              </div>
            </div>
            <AnimatePresence>
              {touched.guests && errors.guests && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <FiAlertCircle className="shrink-0" /> {errors.guests}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Total */}
        <div className="bg-orange-50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Total Amount</span>
          <span className="text-2xl font-bold text-orange-500">{formatPrice(totalAmount)}</span>
        </div>

        {/* Server error */}
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl"
            >
              <FiAlertCircle className="shrink-0" />
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-base transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            'Confirm Booking'
          )}
        </button>

        <p className="text-xs text-slate-400 text-center">
          🔒 Secure booking. No payment required now.
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
