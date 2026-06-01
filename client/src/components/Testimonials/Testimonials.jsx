import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    avatar: 'https://i.pravatar.cc/80?img=29',
    rating: 5,
    tour: 'Rajasthan Royal Heritage',
    comment: 'Roamly made our Rajasthan trip absolutely magical. The havelis, the desert safari in Jaisalmer, and the Holi celebrations in Jaipur — every detail was perfectly arranged. Truly an unforgettable experience!',
  },
  {
    id: 2,
    name: 'Arjun & Meera Nair',
    location: 'Bengaluru, Karnataka',
    avatar: 'https://i.pravatar.cc/80?img=11',
    rating: 5,
    tour: 'Kerala Backwaters Honeymoon',
    comment: 'Our honeymoon in Kerala was beyond perfect. The houseboat on the backwaters, the Ayurvedic spa, and the tea gardens of Munnar — it felt like paradise. Roamly took care of everything beautifully.',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    location: 'Delhi, NCR',
    avatar: 'https://i.pravatar.cc/80?img=35',
    rating: 5,
    tour: 'Ladakh Bike Expedition',
    comment: 'The Ladakh bike trip was the most thrilling experience of my life. Riding through Khardung La, camping under the stars at Pangong Lake — Roamly planned every detail perfectly. Highly recommend!',
  },
  {
    id: 4,
    name: 'Ananya Iyer',
    location: 'Chennai, Tamil Nadu',
    avatar: 'https://i.pravatar.cc/80?img=59',
    rating: 5,
    tour: 'Andaman Island Escape',
    comment: 'The Andaman Islands are absolutely stunning. The snorkeling at Havelock, the bioluminescent beach at night, and the pristine Radhanagar Beach — Roamly exceeded all my expectations!',
  },
  {
    id: 5,
    name: 'The Kapoor Family',
    location: 'Pune, Maharashtra',
    avatar: 'https://i.pravatar.cc/80?img=39',
    rating: 5,
    tour: 'Goa Family Beach Holiday',
    comment: 'Perfect family vacation! The kids loved the water sports and the spice plantation tour. Old Goa churches and the beach shacks made it a complete experience. Our guide was wonderful with the children.',
  },
  {
    id: 6,
    name: 'Vikram Singh',
    location: 'Jaipur, Rajasthan',
    avatar: 'https://i.pravatar.cc/80?img=7',
    rating: 5,
    tour: 'Varanasi Spiritual Journey',
    comment: 'The Ganga Aarti at Dashashwamedh Ghat moved me to tears. The boat ride at sunrise, the narrow lanes of the old city, the morning rituals — Roamly gave me a deeply spiritual and authentic experience.',
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
