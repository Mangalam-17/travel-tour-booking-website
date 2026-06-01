import { useState, useCallback } from 'react';
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
  FiAlertCircle,
  FiCheck,
  FiX,
} from 'react-icons/fi';
import apiFetch from '../../lib/api';

// ── Per-field validators ─────────────────────────────────────────
const validators = {
  name: (v) => {
    if (!v.trim()) return 'Name is required';
    if (v.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(v)) return 'Enter a valid email address';
    return '';
  },
  phone: (v) => {
    if (!v.trim()) return ''; // optional field — only validate if filled
    const digits = v.replace(/\D/g, '');
    if (digits.length !== 10) return 'Phone number must be exactly 10 digits';
    return '';
  },
  subject: (v) => {
    if (!v) return 'Please select a subject';
    return '';
  },
  message: (v) => {
    if (!v.trim()) return 'Message is required';
    if (v.trim().length < 20) return 'Message must be at least 20 characters';
    return '';
  },
};

// ── Field status icon ────────────────────────────────────────────
const FieldStatus = ({ touched, error, value }) => {
  if (!touched || !value) return null;
  if (error) return <FiX className="text-red-500 text-sm" />;
  return <FiCheck className="text-green-500 text-sm" />;
};

// ── Input border class ───────────────────────────────────────────
const fieldClass = (touched, error, value, extra = '') => {
  const base = `w-full bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${extra}`;
  if (!touched || !value) return `${base} border-slate-200 focus:ring-orange-500/30 focus:border-orange-500`;
  if (error) return `${base} border-red-400 bg-red-50 focus:ring-red-500/20 focus:border-red-400`;
  return `${base} border-green-400 bg-green-50/30 focus:ring-green-500/20 focus:border-green-400`;
};

const contactInfo = [
  {
    icon: FiPhone,
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 98765 43211'],
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
    lines: ['42 MG Road, Connaught Place', 'New Delhi – 110001'],
    color: 'bg-green-50 text-green-500',
  },
  {
    icon: FiClock,
    title: 'Working Hours',
    lines: ['Mon – Sat: 9am – 7pm', 'Sun: 10am – 4pm'],
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
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [serverError, setServerError] = useState('');

  const validateField = useCallback((name, value) => {
    const error = validators[name] ? validators[name](value) : '';
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateAll = () => {
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const newErrors = {};
    Object.entries(form).forEach(([name, value]) => {
      const err = validators[name]?.(value) || '';
      if (err) newErrors[name] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setLoading(true);
    setServerError('');
    try {
      await apiFetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email,
          phone: form.phone, subject: form.subject, message: form.message,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
                        setServerError('');
                        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                        setErrors({});
                        setTouched({});
                      }}
                      className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
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
                            onBlur={handleBlur}
                            placeholder="Rahul Sharma"
                            className={fieldClass(touched.name, errors.name, form.name, 'pl-10 pr-9 py-3')}
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            <FieldStatus touched={touched.name} error={errors.name} value={form.name} />
                          </div>
                        </div>
                        <AnimatePresence>
                          {touched.name && errors.name && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                              className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <FiAlertCircle className="shrink-0" /> {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
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
                            onBlur={handleBlur}
                            placeholder="rahul@example.com"
                            className={fieldClass(touched.email, errors.email, form.email, 'pl-10 pr-9 py-3')}
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            <FieldStatus touched={touched.email} error={errors.email} value={form.email} />
                          </div>
                        </div>
                        <AnimatePresence>
                          {touched.email && errors.email && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                              className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <FiAlertCircle className="shrink-0" /> {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Phone + Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone (optional) */}
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
                            onBlur={handleBlur}
                            placeholder="+91 98765 43210"
                            maxLength={10}
                            className={fieldClass(touched.phone, errors.phone, form.phone, 'pl-10 pr-9 py-3')}
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            <FieldStatus touched={touched.phone} error={errors.phone} value={form.phone} />
                          </div>
                        </div>
                        <AnimatePresence>
                          {touched.phone && errors.phone && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                              className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <FiAlertCircle className="shrink-0" /> {errors.phone}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Subject */}
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
                            onBlur={handleBlur}
                            className={fieldClass(touched.subject, errors.subject, form.subject, 'appearance-none pl-4 pr-10 py-3 cursor-pointer')}
                          >
                            <option value="">Select a subject</option>
                            {subjects.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <AnimatePresence>
                          {touched.subject && errors.subject && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                              className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <FiAlertCircle className="shrink-0" /> {errors.subject}
                            </motion.p>
                          )}
                        </AnimatePresence>
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
                          onBlur={handleBlur}
                          rows={5}
                          placeholder="Tell us how we can help you..."
                          className={fieldClass(touched.message, errors.message, form.message, 'pl-10 pr-4 py-3 resize-none')}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <AnimatePresence>
                          {touched.message && errors.message ? (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                              className="text-red-500 text-xs flex items-center gap-1">
                              <FiAlertCircle className="shrink-0" /> {errors.message}
                            </motion.p>
                          ) : <span />}
                        </AnimatePresence>
                        <span className={`text-xs ml-auto ${form.message.length >= 20 ? 'text-green-500' : 'text-slate-400'}`}>
                          {form.message.length} / 20 min
                        </span>
                      </div>
                    </div>

                    {/* Server error */}
                    <AnimatePresence>
                      {serverError && (
                        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                          <FiAlertCircle className="shrink-0" />
                          {serverError}
                        </motion.div>
                      )}
                    </AnimatePresence>

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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9024374536!2d77.2195!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x77f8be0f4a5c5c5%3A0x0!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
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
                      <div className="text-slate-500 text-xs mt-0.5">42 MG Road, Connaught Place, New Delhi – 110001</div>
                    </div>
                  </div>
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
