import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMapPin, FiClock, FiStar } from 'react-icons/fi';
import BookingForm from '../../components/BookingForm/BookingForm';
import tours from '../../data/tours';
import { formatPrice } from '../../utils/helpers';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find((t) => t.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Tour Not Found</h2>
          <Link to="/destinations" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold">
            Browse Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm"
          >
            <FiArrowLeft /> Back
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              Secure Booking
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Complete Your Booking</h1>
            <p className="text-slate-400 mt-2 text-sm">Fill in your details to reserve your spot</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Tour Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden sticky top-24">
              <div className="relative h-48">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg leading-tight">{tour.title}</h3>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <FiMapPin className="text-orange-500 shrink-0" />
                  {tour.destination}, {tour.country}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <FiClock className="text-orange-500 shrink-0" />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <FiStar className="text-amber-400 shrink-0" style={{ fill: '#fbbf24' }} />
                  <span>{tour.rating} ({tour.reviews.length} reviews)</span>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs text-slate-400 mb-1">Price per person</div>
                  <div className="text-2xl font-bold text-orange-500">{formatPrice(tour.price)}</div>
                </div>

                <div className="bg-green-50 rounded-xl p-3">
                  <div className="text-xs font-semibold text-green-700 mb-1">✓ What's Included</div>
                  {tour.facilities.map((f) => (
                    <div key={f} className="text-xs text-green-600 flex items-center gap-1.5 mt-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <BookingForm tour={tour} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
