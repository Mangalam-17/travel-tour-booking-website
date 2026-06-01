import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiAward,
  FiHeart,
  FiShield,
  FiUsers,
  FiMapPin,
  FiStar,
  FiGlobe,
} from 'react-icons/fi';

const stats = [
  { icon: FiMapPin, value: '50+', label: 'Indian Destinations' },
  { icon: FiUsers, value: '50K+', label: 'Happy Travelers' },
  { icon: FiStar, value: '4.9', label: 'Average Rating' },
  { icon: FiGlobe, value: '12+', label: 'Years Experience' },
];

const values = [
  {
    icon: FiHeart,
    title: 'Passion for Travel',
    desc: 'We live and breathe travel. Every itinerary is crafted with genuine love for exploration and discovery.',
    color: 'bg-red-50 text-red-500',
  },
  {
    icon: FiShield,
    title: 'Trust & Safety',
    desc: 'Your safety is non-negotiable. All tours are fully vetted, insured, and backed by 24/7 support.',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: FiAward,
    title: 'Quality First',
    desc: 'From hand-picked hotels to expert local guides, we never compromise on the quality of your experience.',
    color: 'bg-amber-50 text-amber-500',
  },
  {
    icon: FiUsers,
    title: 'People-Centered',
    desc: 'We treat every traveler as family. Personalized service and genuine care are at the heart of what we do.',
    color: 'bg-green-50 text-green-500',
  },
];

const team = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    image: 'https://i.pravatar.cc/200?img=12',
    bio: '15 years in travel across India. Built Roamly to help every Indian discover the incredible beauty of their own country.',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Experiences',
    image: 'https://i.pravatar.cc/200?img=29',
    bio: 'Former travel journalist from Delhi who curates every itinerary with an obsessive eye for authentic Indian experiences.',
  },
  {
    name: 'Ravi Nair',
    role: 'Operations Director',
    image: 'https://i.pravatar.cc/200?img=15',
    bio: 'Logistics expert from Kochi ensuring every transfer, hotel, and activity runs like clockwork across all Indian destinations.',
  },
  {
    name: 'Ananya Iyer',
    role: 'Customer Experience Lead',
    image: 'https://i.pravatar.cc/200?img=47',
    bio: 'From Chennai, dedicated to making sure every traveler feels supported before, during, and after their journey across India.',
  },
];

const milestones = [
  { year: '2012', event: 'Roamly founded in Mumbai with just 5 Indian tour packages and a big dream.' },
  { year: '2015', event: 'Reached 5,000 happy travelers and expanded to 30 destinations across India.' },
  { year: '2018', event: 'Launched honeymoon and heritage packages. Won Best Indian Travel Agency award.' },
  { year: '2021', event: 'Went fully digital. Introduced real-time booking and 24/7 Hindi & English support.' },
  { year: '2024', event: 'Serving 50,000+ travelers across 50+ destinations all over Incredible India.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-400 rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              We Turn Dreams Into{' '}
              <span className="text-orange-400">Journeys</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
              Roamly was born from a simple belief — that travel has the power to transform lives.
              Since 2012, we've been crafting unforgettable experiences for adventurers, families,
              honeymooners, and everyone in between.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-orange-50 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-orange-500 text-xl" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
                Making Incredible India Accessible to Every Traveler
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                We believe extraordinary travel shouldn't be reserved for the few. Our mission is to
                make India's most breathtaking destinations — from the Himalayas to Kanyakumari —
                accessible, affordable, and stress-free for every Indian traveler.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Every tour we design is the result of months of on-the-ground research, local
                partnerships across India, and relentless attention to detail. We don't just book trips — we
                engineer memories of Incredible India.
              </p>
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
              >
                Explore Our Tours <FiArrowRight />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80"
                  alt="Rajasthan"
                  className="rounded-2xl object-cover w-full h-52 shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80"
                  alt="Kerala"
                  className="rounded-2xl object-cover w-full h-52 shadow-lg mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80"
                  alt="Taj Mahal"
                  className="rounded-2xl object-cover w-full h-52 shadow-lg -mt-4"
                />
                <img
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80"
                  alt="Ladakh"
                  className="rounded-2xl object-cover w-full h-52 shadow-lg mt-4"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white rounded-2xl px-5 py-4 shadow-xl">
                <div className="text-2xl font-bold">12+</div>
                <div className="text-xs text-orange-100">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${v.color}`}>
                  <v.icon className="text-xl" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">How We Got Here</h2>
          </motion.div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 -translate-x-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-14 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 inline-block w-full">
                      <div className="text-orange-500 font-bold text-lg mb-1">{m.year}</div>
                      <p className="text-slate-600 text-sm">{m.event}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-md top-5" />
                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              The People Behind It
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Meet Our Team</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Passionate travelers who turned their love for the world into a career helping others explore it.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative inline-block mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-white shadow-md group-hover:ring-orange-200 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-2 border-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-0.5">{member.name}</h3>
                <div className="text-orange-500 text-xs font-semibold mb-3">{member.role}</div>
                <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              Join 50,000+ travelers who've trusted Roamly to create their perfect journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:shadow-xl"
              >
                Browse Tours <FiArrowRight />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 glass text-white hover:bg-white/20 px-8 py-4 rounded-full font-bold text-base transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
