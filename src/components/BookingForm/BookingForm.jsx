import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCalendar, FiUsers, FiCheckCircle } from 'react-icons/fi';
import { formatPrice } from '../../utils/helpers';

const BookingForm = ({ tour }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    guests: 1,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalAmount = tour.price * form.guests;

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) newErrors.phone = 'Invalid phone number';
    if (!form.travelDate) newErrors.travelDate = 'Travel date is required';
    else if (new Date(form.travelDate) < new Date()) newErrors.travelDate = 'Date must be in the future';
    if (form.guests < 1) newErrors.guests = 'At least 1 guest required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'guests' ? Number(value) : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const today = new Date().toISOString().split('T')[0];

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
            <span className="font-medium text-slate-800">{new Date(form.travelDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
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
          onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', phone: '', travelDate: '', guests: 1 }); }}
          className="text-sm text-orange-500 hover:text-orange-600 font-medium"
        >
          Make another booking
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Summary */}
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
              placeholder="John Doe"
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
          </div>
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
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
              placeholder="john@example.com"
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
              placeholder="+1 (555) 000-0000"
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all ${errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Travel Date & Guests */}
        <div className="grid grid-cols-2 gap-4">
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
                className={`w-full pl-10 pr-3 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all ${errors.travelDate ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
              />
            </div>
            {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>}
          </div>

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
                className={`w-full pl-10 pr-3 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all ${errors.guests ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
              />
            </div>
            {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
          </div>
        </div>

        {/* Total */}
        <div className="bg-orange-50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Total Amount</span>
          <span className="text-2xl font-bold text-orange-500">{formatPrice(totalAmount)}</span>
        </div>

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
