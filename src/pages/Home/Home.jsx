import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiStar } from 'react-icons/fi';
import Hero from '../../components/Hero/Hero';
import SearchBar from '../../components/SearchBar/SearchBar';
import TourCard from '../../components/TourCard/TourCard';
import SkeletonCard from '../../components/TourCard/SkeletonCard';
import Testimonials from '../../components/Testimonials/Testimonials';
import { useTours } from '../../hooks/useTours';

const featuredDestinations = [
  { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', tours: 3, rating: 4.8 },
  { name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', tours: 2, rating: 5.0 },
  { name: 'Switzerland', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', tours: 2, rating: 4.9 },
  { name: 'Japan', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', tours: 1, rating: 4.7 },
  { name: 'Greece', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', tours: 1, rating: 4.9 },
  { name: 'Tanzania', country: 'Tanzania', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', tours: 1, rating: 4.9 },
];

const whyUs = [
  { icon: '🏆', title: 'Best Price Guarantee', desc: 'We match any price you find. No hidden fees, transparent pricing always.' },
  { icon: '🛡️', title: 'Safe & Secure', desc: 'Your safety is our priority. All tours are vetted and insured.' },
  { icon: '🌍', title: '150+ Destinations', desc: 'From tropical beaches to mountain peaks, we cover the world.' },
  { icon: '⭐', title: '24/7 Support', desc: 'Our travel experts are available around the clock to assist you.' },
];

const Home = () => {
  const { tours, loading } = useTours();
  const popularTours = tours.slice(0, 6);

  return (
    <div>
      <Hero />
      <SearchBar />

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-5"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="featured" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                Top Picks
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
                Featured Destinations
              </h2>
            </div>
            <Link
              to="/destinations"
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors shrink-0"
            >
              View All <FiArrowRight />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredDestinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  to={`/destinations?search=${dest.name}`}
                  className="group block relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="font-bold text-white text-sm">{dest.name}</div>
                    <div className="text-white/70 text-xs">{dest.country}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <FiStar className="text-amber-400 text-xs" style={{ fill: '#fbbf24' }} />
                      <span className="text-white text-xs font-medium">{dest.rating}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tours */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                Popular Packages
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
                Tour Packages
              </h2>
              <p className="text-slate-500 mt-2 max-w-lg">
                Handpicked tours for every type of traveler. Adventure, luxury, family, and more.
              </p>
            </div>
            <Link
              to="/destinations"
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors shrink-0"
            >
              View All Tours <FiArrowRight />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : popularTours.map((tour, i) => (
                  <TourCard key={tour.id} tour={tour} index={i} />
                ))
            }
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Join over 50,000 happy travelers who've discovered the world with Roamly.
            </p>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:shadow-xl"
            >
              Start Exploring <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default Home;
