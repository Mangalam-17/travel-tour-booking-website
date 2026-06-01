import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff,
  FiAlertCircle, FiCheck, FiX, FiGlobe,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

// ── Validators ───────────────────────────────────────────────────
const validators = {
  name: (v) => {
    if (!v.trim()) return 'Full name is required';
    if (v.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(v)) return 'Enter a valid email address';
    return '';
  },
  password: (v) => {
    if (!v) return 'Password is required';
    if (v.length < 6) return 'Password must be at least 6 characters';
    return '';
  },
  confirmPassword: (v, form) => {
    if (!v) return 'Please confirm your password';
    if (v !== form.password) return 'Passwords do not match';
    return '';
  },
};

// ── Password strength ────────────────────────────────────────────
const getStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 6)  score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score, label: 'Weak',   color: 'bg-red-400' };
  if (score <= 3) return { score, label: 'Medium', color: 'bg-yellow-400' };
  return           { score, label: 'Strong', color: 'bg-green-500' };
};

// ── Field status icon ────────────────────────────────────────────
const FieldStatus = ({ touched, error, value }) => {
  if (!touched || !value) return null;
  if (error) return <FiX className="text-red-500 text-sm" />;
  return <FiCheck className="text-green-500 text-sm" />;
};

// ── Input class ──────────────────────────────────────────────────
const fieldClass = (touched, error, value, extra = '') => {
  const base = `w-full bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400
    focus:outline-none focus:ring-2 transition-all ${extra}`;
  if (!touched || !value) return `${base} border-slate-200 focus:ring-orange-500/30 focus:border-orange-500`;
  if (error)  return `${base} border-red-400 bg-red-50 focus:ring-red-500/20 focus:border-red-400`;
  return `${base} border-green-400 bg-green-50/30 focus:ring-green-500/20 focus:border-green-400`;
};

// ── Component ────────────────────────────────────────────────────
const Register = () => {
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = getStrength(form.password);

  const validateField = useCallback((name, value) => {
    const error = name === 'confirmPassword'
      ? validators.confirmPassword(value, form)
      : validators[name]?.(value) || '';
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
    // Re-validate confirmPassword live when password changes
    if (name === 'password' && touched.confirmPassword) {
      const err = validators.confirmPassword(form.confirmPassword, { ...form, password: value });
      setErrors((prev) => ({ ...prev, confirmPassword: err }));
    }
    setServerError('');
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
      const err = name === 'confirmPassword'
        ? validators.confirmPassword(value, form)
        : validators[name]?.(value) || '';
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
      await register(form.name, form.email, form.password);
      navigate('/', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <FiGlobe className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-slate-800">
              Roam<span className="text-orange-500">ly</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">Start exploring Incredible India today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Server error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5"
              >
                <FiAlertCircle className="shrink-0" />
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Full Name */}
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
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
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
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <FiAlertCircle className="shrink-0" /> {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Min. 6 characters"
                  className={fieldClass(touched.password, errors.password, form.password, 'pl-10 pr-11 py-3')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Password strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength.score ? strength.color : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${
                    strength.score <= 1 ? 'text-red-500' :
                    strength.score <= 3 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {strength.label} password
                  </p>
                </div>
              )}

              <AnimatePresence>
                {touched.password && errors.password && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <FiAlertCircle className="shrink-0" /> {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Re-enter your password"
                  className={fieldClass(touched.confirmPassword, errors.confirmPassword, form.confirmPassword, 'pl-10 pr-11 py-3')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <AnimatePresence>
                {touched.confirmPassword && errors.confirmPassword && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <FiAlertCircle className="shrink-0" /> {errors.confirmPassword}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
