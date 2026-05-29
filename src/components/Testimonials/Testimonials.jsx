import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://i.pravatar.cc/80?img=1',
    rating: 5,
    tour: 'Bali Paradise Escape',
    comment: 'Roamly made our Bali trip absolutely magical. Every detail was perfectly arranged, from the airport pickup to the sunset dinner. The guide was incredibly knowledgeable and made us feel like locals!',
  },
  {
    id: 2,
    name: 'James & Sophie',
    location: 'London, UK',
    avatar: 'https://i.pravatar.cc/80?img=11',
    rating: 5,
    tour: 'Maldives Luxury Retreat',
    comment: 'Our honeymoon in the Maldives was beyond perfect. The overwater bungalow was a dream, and the underwater restaurant dinner was something we\'ll never forget. Worth every penny!',
  },
  {
    id: 3,
    name: 'Carlos Mendez',
    location: 'Madrid, Spain',
    avatar: 'https://i.pravatar.cc/80?img=35',
    rating: 5,
    tour: 'Machu Picchu Discovery',
    comment: 'The Inca Trail trek was challenging but the most rewarding experience of my life. Watching the sunrise over Machu Picchu after 4 days of trekking was absolutely breathtaking. Highly recommend!',
  },
  {
    id: 4,
    name: 'Anna Kowalski',
    location: 'Warsaw, Poland',
    avatar: 'https://i.pravatar.cc/80?img=59',
    rating: 5,
    tour: 'Iceland Northern Lights',
    comment: 'I saw the Northern Lights on three separate nights! Iceland is absolutely magical in winter. The glacier hiking and ice caves were incredible. Roamly exceeded all my expectations.',
  },
  {
    id: 5,
    name: 'The Martinez Family',
    location: 'Miami, USA',
    avatar: 'https://i.pravatar.cc/80?img=39',
    rating: 5,
    tour: 'Amalfi Coast Family Holiday',
    comment: 'Perfect family vacation! The kids loved Pompeii and the pizza-making class. The Amalfi Coast scenery is breathtaking. Our guide was patient with the children and made everything fun.',
  },
  {
    id: 6,
    name: 'David Park',
    location: 'Seoul, South Korea',
    avatar: 'https://i.pravatar.cc/80?img=7',
    rating: 5,
    tour: 'Swiss Alps Adventure',
    comment: 'The Swiss Alps are absolutely stunning. Skiing on the Jungfrau slopes was incredible, and the Glacier Express train journey was one of the most scenic rides I\'ve ever taken.',
  },
];

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
  >
    <FaQuoteLeft className="text-orange-200 text-3xl mb-4" />

    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
      "{testimonial.comment}"
    </p>

    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <FiStar
          key={i}
          className={`text-sm ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
          style={{ fill: i < testimonial.rating ? '#fbbf24' : 'none' }}
        />
      ))}
    </div>

    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-11 h-11 rounded-full object-cover ring-2 ring-orange-100"
      />
      <div>
        <div className="font-semibold text-slate-800 text-sm">{testimonial.name}</div>
        <div className="text-xs text-slate-400">{testimonial.location}</div>
        <div className="text-xs text-orange-500 font-medium mt-0.5">{testimonial.tour}</div>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Real stories from real travelers who've experienced the magic of Roamly tours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
