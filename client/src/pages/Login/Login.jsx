import { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail, FiLock, FiEye, FiEyeOff,
  FiAlertCircle, FiCheck, FiX, FiGlobe,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

// ── Validators ───────────────────────────────────────────────────
const validators = {
  email: (v) => {
    if (!v.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(v)) return 'Enter a valid email address';
    return '';
  },
  password: (v) => {
    if (!v) return 'Password is required';
    return '';
  },
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
const Login = () => {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError]   = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from = location.state?.from || '/';

  const validateField = useCallback((name, value) => {
    const error = validators[name]?.(value) || '';
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
    setServerError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateAll = () => {
    setTouched({ email: true, password: true });
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
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin' : from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Invalid email or password');
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
          <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Server error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5"
              >
                <FiAlertCircle className="shrink-0" />
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

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
                  <motion.p
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
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
                  placeholder="Enter your password"
                  className={fieldClass(touched.password, errors.password, form.password, 'pl-10 pr-11 py-3')}
                />
                {/* show/hide toggle — always on right */}
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <AnimatePresence>
                {touched.password && errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <FiAlertCircle className="shrink-0" /> {errors.password}
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
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500 hover:text-orange-600 font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
