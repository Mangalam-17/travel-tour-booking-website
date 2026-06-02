import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { FiArrowRight, FiStar, FiUsers, FiMapPin } from 'react-icons/fi';
import apiFetch from '../../lib/api';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Fallback slides if API is unavailable
const FALLBACK_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80',
    title: 'Discover Rajasthan',
    subtitle: 'Land of Kings',
    tag: 'Heritage & Culture',
  },
  {
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1600&q=80',
    title: 'Kerala Backwaters',
    subtitle: "God's Own Country",
    tag: 'Nature & Serenity',
  },
  {
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80',
    title: 'Taj Mahal, Agra',
    subtitle: 'Wonder of the World',
    tag: 'Iconic India',
  },
  {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80',
    title: 'Himachal Pradesh',
    subtitle: 'Adventure in the Himalayas',
    tag: 'Mountain Adventure',
  },
];

const stats = [
  { icon: FiMapPin, value: '50+', label: 'Destinations' },
  { icon: FiUsers, value: '50K+', label: 'Happy Travelers' },
  { icon: FiStar, value: '4.9', label: 'Avg Rating' },
];

const Hero = () => {
  const swiperRef = useRef(null);
  const [slides, setSlides] = useState(FALLBACK_SLIDES);

  useEffect(() => {
    apiFetch('/api/hero-slides')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setSlides(res.data);
        }
      })
      .catch(() => {
        // silently fall back to hardcoded slides
      });
  }, []);

  return (
    <section className="relative min-h-[560px] sm:min-h-[680px] lg:min-h-screen overflow-hidden">
      {/* Background Swiper */}
      <div className="absolute inset-0">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide._id || index}>
              <div className="relative h-full w-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/75" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-[560px] sm:min-h-[680px] lg:min-h-screen px-4 pt-28 sm:pt-36 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center flex-1 flex flex-col items-center justify-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block bg-orange-500/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 sm:mb-6 tracking-wider uppercase"
          >
            ✈ Your Journey Begins Here
          </motion.span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Explore India's{' '}
            <span className="text-orange-400">Most Beautiful</span>{' '}
            Destinations
          </h1>

          <p className="text-base sm:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Handcrafted travel experiences across the length and breadth of Incredible India — from Himalayan peaks to tropical backwaters.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <Link
              to="/destinations"
              className="group inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40"
            >
              Explore Tours
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#featured"
              className="inline-flex items-center justify-center gap-2 glass text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-white/20 transition-all duration-300"
            >
              View Destinations
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-lg mx-auto mt-8 sm:mt-10"
        >
          <div className="glass rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-around gap-2">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2 sm:gap-3 text-white">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/80 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="text-sm sm:text-lg" />
                </div>
                <div>
                  <div className="text-sm sm:text-xl font-bold leading-none">{value}</div>
                  <div className="text-xs text-white/70 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
