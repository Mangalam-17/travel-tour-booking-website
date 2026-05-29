import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { FiArrowRight, FiStar, FiUsers, FiMapPin } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80',
    title: 'Discover Bali',
    subtitle: 'Island of the Gods',
    tag: 'Beach Paradise',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    title: 'Swiss Alps',
    subtitle: 'Adventure Awaits',
    tag: 'Mountain Adventure',
  },
  {
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=80',
    title: 'Maldives',
    subtitle: 'Pure Luxury',
    tag: 'Luxury Escape',
  },
  {
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80',
    title: 'Serengeti',
    subtitle: 'Wild Africa',
    tag: 'Wildlife Safari',
  },
];

const stats = [
  { icon: FiMapPin, value: '150+', label: 'Destinations' },
  { icon: FiUsers, value: '50K+', label: 'Happy Travelers' },
  { icon: FiStar, value: '4.9', label: 'Average Rating' },
];

const Hero = () => {
  const swiperRef = useRef(null);

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
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
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block bg-orange-500/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase"
          >
            ✈ Your Journey Begins Here
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Explore the World's{' '}
            <span className="text-orange-400">Most Beautiful</span>{' '}
            Destinations
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Handcrafted travel experiences that turn your dream vacations into unforgettable memories. From tropical beaches to mountain peaks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/destinations"
              className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              Explore Tours
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#featured"
              className="inline-flex items-center gap-2 glass text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/20 transition-all duration-300"
            >
              View Destinations
            </a>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
        >
          <div className="glass rounded-2xl px-6 py-4 flex items-center justify-around gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-orange-500/80 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="text-lg" />
                </div>
                <div>
                  <div className="text-xl font-bold leading-none">{value}</div>
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
