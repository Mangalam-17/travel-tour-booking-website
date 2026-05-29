import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { FiMapPin, FiClock, FiStar, FiArrowLeft, FiCheck, FiChevronDown } from 'react-icons/fi';
import { FaHotel, FaCoffee, FaCar, FaUserTie, FaBus } from 'react-icons/fa';
import WishlistButton from '../../components/WishlistButton/WishlistButton';
import tours from '../../data/tours';
import { formatPrice } from '../../utils/helpers';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const facilityIcons = {
  'Hotel Stay': FaHotel,
  'Breakfast': FaCoffee,
  'Airport Pickup': FaCar,
  'Tour Guide': FaUserTie,
  'Transportation': FaBus,
};

const tourTypeColors = {
  Adventure: 'bg-emerald-100 text-emerald-700',
  Luxury: 'bg-purple-100 text-purple-700',
  Family: 'bg-blue-100 text-blue-700',
  Honeymoon: 'bg-pink-100 text-pink-700',
  Beach: 'bg-cyan-100 text-cyan-700',
  Wildlife: 'bg-amber-100 text-amber-700',
};

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [openDay, setOpenDay] = useState(0);

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
          <p className="text-slate-500 mb-6">The tour you're looking for doesn't exist.</p>
          <Link to="/destinations" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold">
            Browse Tours
          </Link>
        </div>
      </div>
    );
  }

  const avgRating = tour.reviews.reduce((sum, r) => sum + r.rating, 0) / tour.reviews.length;

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-orange-500 mb-6 transition-colors text-sm font-medium"
        >
          <FiArrowLeft /> Back to Tours
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md"
            >
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="h-72 sm:h-96"
              >
                {tour.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img src={img} alt={`${tour.title} ${i + 1}`} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="p-3">
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={8}
                  slidesPerView={4}
                  watchSlidesProgress
                  className="thumbs-swiper"
                >
                  {tour.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={img}
                        alt={`thumb ${i + 1}`}
                        className="w-full h-16 object-cover rounded-lg cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>

            {/* Tour Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tourTypeColors[tour.tourType] || 'bg-slate-100 text-slate-700'}`}>
                    {tour.tourType}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-3 mb-2">{tour.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="text-orange-500" />
                      {tour.destination}, {tour.country}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock className="text-orange-500" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiStar className="text-amber-400" style={{ fill: '#fbbf24' }} />
                      <strong>{tour.rating}</strong>
                      <span className="text-slate-400">({tour.reviews.length} reviews)</span>
                    </span>
                  </div>
                </div>
                <WishlistButton tourId={tour.id} className="w-10 h-10" />
              </div>

              <p className="text-slate-600 leading-relaxed">{tour.description}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-5">Tour Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="text-orange-500 text-xs" />
                    </div>
                    <span className="text-slate-600 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-5">Facilities Included</h2>
              <div className="flex flex-wrap gap-3">
                {tour.facilities.map((facility) => {
                  const Icon = facilityIcons[facility] || FiCheck;
                  return (
                    <div
                      key={facility}
                      className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2.5 rounded-xl text-sm font-medium"
                    >
                      <Icon className="text-orange-500" />
                      {facility}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-5">Day-by-Day Itinerary</h2>
              <div className="space-y-3">
                {tour.itinerary.map((item, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenDay(openDay === i ? -1 : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                          {item.day}
                        </span>
                        <span className="font-semibold text-slate-800 text-sm">{item.title}</span>
                      </div>
                      <FiChevronDown
                        className={`text-slate-400 transition-transform duration-200 ${openDay === i ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openDay === i && (
                      <div className="px-4 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                        {item.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-800">Traveler Reviews</h2>
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl">
                  <FiStar className="text-amber-400" style={{ fill: '#fbbf24' }} />
                  <span className="font-bold text-slate-800">{avgRating.toFixed(1)}</span>
                  <span className="text-slate-400 text-xs">/ 5</span>
                </div>
              </div>
              <div className="space-y-4">
                {tour.reviews.map((review) => (
                  <div key={review.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-800 text-sm">{review.name}</span>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className="text-xs"
                            style={{ color: i < review.rating ? '#fbbf24' : '#e2e8f0', fill: i < review.rating ? '#fbbf24' : '#e2e8f0' }}
                          />
                        ))}
                      </div>
                      <p className="text-slate-600 text-sm">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                  <div className="text-3xl font-bold">{formatPrice(tour.price)}</div>
                  <div className="text-orange-100 text-sm">per person</div>
                  <div className="flex items-center gap-2 mt-3">
                    <FiStar style={{ fill: '#fbbf24', color: '#fbbf24' }} />
                    <span className="font-semibold">{tour.rating}</span>
                    <span className="text-orange-200 text-sm">({tour.reviews.length} reviews)</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FiClock className="text-orange-500 shrink-0" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FiMapPin className="text-orange-500 shrink-0" />
                    <span>{tour.destination}, {tour.country}</span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    {tour.facilities.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <FiCheck className="text-green-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/booking/${tour.id}`}
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-4 rounded-xl font-bold text-base transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
                  >
                    Book Now
                  </Link>
                  <p className="text-xs text-slate-400 text-center">
                    Free cancellation up to 48 hours before
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
