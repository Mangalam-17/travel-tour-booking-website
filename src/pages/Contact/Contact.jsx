import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCheckCircle,
  FiChevronDown,
} from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const contactInfo = [
  {
    icon: FiPhone,
    title: 'Call Us',
    lines: ['+1 (123) 456-7890', '+1 (123) 456-7891'],
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: FiMail,
    title: 'Email Us',
    lines: ['hello@roamly.com', 'support@roamly.com'],
    color: 'bg-orange-50 text-orange-500',
  },
  {
    icon: FiMapPin,
    title: 'Visit Us',
    lines: ['123 Travel Street', 'Adventure City, AC 10001'],
    color: 'bg-green-50 text-green-500',
  },
  {
    icon: FiClock,
    title: 'Working Hours',
    lines: ['Mon – Fri: 9am – 7pm', 'Sat – Sun: 10am – 5pm'],
    color: 'bg-purple-50 text-purple-500',
  },
];

const faqs = [
  {
    q: 'How do I book a tour?',
    a: 'Browse our destinations, pick a tour you love, and click "Book Now". Fill in your details and you\'re all set — no payment required upfront.',
  },
  {
    q: 'Can I cancel or modify my booking?',
    a: 'Yes. We offer free cancellation up to 48 hours before your tour start date. Modifications can be made up to 72 hours in advance by contacting our support team.',
  },
  {
    q: 'Are flights included in the tour price?',
    a: 'Tour prices cover accommodation, meals as listed, transfers, guides, and activities. International flights are not included unless explicitly stated in the package.',
  },
  {
    q: 'Do you offer group discounts?',
    a: 'Absolutely. Groups of 6 or more receive a 10% discount, and groups of 12+ receive 15% off. Contact us directly to arrange group bookings.',
  },
  {
    q: 'Is travel insurance included?',
    a: 'Travel insurance is not included by default but we strongly recommend it. We can connect you with our trusted insurance partners at checkout.',
  },
];

const subjects = [
  'General Inquiry',
  'Booking Support',
  'Tour Information',
  'Group Bookings',
  'Cancellation / Refund',
  'Partnership',
  'Other',
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const FaqItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm pr-4">{faq.q}</span>
        <FiChevronDown
          className={`text-slate-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.subject) e.subject = 'Please select a subject';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              We'd Love to Hear From You
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Have a question, need help planning your trip, or just want to say hello? Our team is here for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${item.color}`}>
                  <item.icon className="text-xl" />
                </div>
                <h3 className="font-bold text-slate-800 mb-3">{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-slate-500 text-sm">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                  <h2 className="text-xl font-bold mb-1">Send Us a Message</h2>
                  <p className="text-orange-100 text-sm">We typically respond within 2–4 hours on business days.</p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <FiCheckCircle className="text-green-500 text-4xl" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                    <p className="text-slate-500 text-sm mb-6">
                      Thanks, <strong>{form.name}</strong>! We've received your message and will get back to you at <strong>{form.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                      }}
                      className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                          Full Name
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
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
                    </div>

                    {/* Phone + Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                          Phone <span className="text-slate-400 normal-case font-normal">(optional)</span>
                        </label>
                        <div className="relative">
                          <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                          Subject
                        </label>
                        <div className="relative">
                          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className={`w-full appearance-none pl-4 pr-10 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all cursor-pointer ${errors.subject ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                          >
                            <option value="">Select a subject</option>
                            {subjects.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                        Message
                      </label>
                      <div className="relative">
                        <FiMessageSquare className="absolute left-3.5 top-3.5 text-slate-400" />
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell us how we can help you..."
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        {errors.message
                          ? <p className="text-red-500 text-xs">{errors.message}</p>
                          : <span />
                        }
                        <span className="text-xs text-slate-400 ml-auto">{form.message.length} chars</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-base transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Map placeholder */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <iframe
                  title="Roamly Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.98784368459418!3d40.75797497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                      <FiMapPin className="text-orange-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">Roamly HQ</div>
                      <div className="text-slate-500 text-xs mt-0.5">123 Travel Street, Adventure City, AC 10001</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-bold text-slate-800 mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { Icon: FaFacebookF, label: 'Facebook', color: 'hover:bg-blue-500' },
                    { Icon: FaTwitter, label: 'Twitter', color: 'hover:bg-sky-400' },
                    { Icon: FaInstagram, label: 'Instagram', color: 'hover:bg-pink-500' },
                    { Icon: FaYoutube, label: 'YouTube', color: 'hover:bg-red-500' },
                  ].map(({ Icon, label, color }) => (
                    <a
                      key={label}
                      href="#"
                      className={`flex items-center gap-3 bg-slate-50 ${color} hover:text-white text-slate-600 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200`}
                    >
                      <Icon className="text-base" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-lg mb-2">Quick Response</h3>
                <p className="text-orange-100 text-sm leading-relaxed">
                  Our support team responds to all inquiries within <strong className="text-white">2–4 hours</strong> during business hours. For urgent matters, call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Frequently Asked Questions</h2>
            <p className="text-slate-500 mt-3">Quick answers to the questions we hear most often.</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
