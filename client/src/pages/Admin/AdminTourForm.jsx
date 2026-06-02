import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiPlus, FiTrash2, FiSave,
  FiImage, FiList, FiCheckSquare, FiCalendar, FiAlertCircle,
  FiUpload, FiLink, FiX,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import apiFetch from '../../lib/api';

const TOUR_TYPES = ['Adventure', 'Heritage', 'Family', 'Honeymoon', 'Beach', 'Wildlife', 'Spiritual'];
const ALL_FACILITIES = ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'];

const emptyForm = {
  title: '', destination: '', country: 'India', price: '', rating: '',
  duration: '', tourType: '', description: '',
  images: [''],
  highlights: [''],
  facilities: [],
  itinerary: [{ day: 1, title: '', description: '' }],
};

// ── Reusable field components ────────────────────────────────────
const Label = ({ children, required }) => (
  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
    {children} {required && <span className="text-red-400">*</span>}
  </label>
);

const Input = ({ error, ...props }) => (
  <input
    {...props}
    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400
      focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all
      ${error ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
  />
);

const Textarea = ({ error, ...props }) => (
  <textarea
    {...props}
    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400
      focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all resize-none
      ${error ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
  />
);

const SectionCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50">
      <Icon className="text-orange-500" />
      <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ── Image Input — upload OR paste URL ───────────────────────────
const ImageInput = ({ index, value, onChange, onRemove, getToken }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [mode, setMode] = useState(value ? 'url' : 'choose'); // 'choose' | 'upload' | 'url'

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/admin/upload`,
        { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: formData }
      );
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Upload failed');
      onChange(data.url);
      setMode('url');
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Image {index + 1}</span>
        {onRemove && (
          <button type="button" onClick={onRemove}
            className="p-1 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
            <FiX className="text-sm" />
          </button>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* Mode selector — only show if no image yet */}
        {!value && mode === 'choose' && (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('upload')}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all group"
            >
              <FiUpload className="text-2xl text-slate-400 group-hover:text-orange-500 transition-colors" />
              <span className="text-xs font-semibold text-slate-500 group-hover:text-orange-600">Upload from device</span>
              <span className="text-xs text-slate-400">JPG, PNG, WebP · max 5MB</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all group"
            >
              <FiLink className="text-2xl text-slate-400 group-hover:text-orange-500 transition-colors" />
              <span className="text-xs font-semibold text-slate-500 group-hover:text-orange-600">Paste image URL</span>
              <span className="text-xs text-slate-400">https://...</span>
            </button>
          </div>
        )}

        {/* Upload mode */}
        {mode === 'upload' && !value && (
          <div>
            <label
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                uploading ? 'border-orange-300 bg-orange-50' : 'border-slate-200 hover:border-orange-400 hover:bg-orange-50'
              }`}
            >
              {uploading ? (
                <>
                  <div className="w-8 h-8 border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                  <span className="text-sm text-orange-600 font-medium">Uploading to Cloudinary...</span>
                </>
              ) : (
                <>
                  <FiUpload className="text-3xl text-slate-400" />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700">Click to choose a file</p>
                    <p className="text-xs text-slate-400 mt-0.5">or drag and drop here</p>
                  </div>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {uploadError && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <FiAlertCircle className="shrink-0" /> {uploadError}
              </p>
            )}
            <button type="button" onClick={() => setMode('choose')}
              className="text-xs text-slate-400 hover:text-slate-600 mt-2 transition-colors">
              ← Back
            </button>
          </div>
        )}

        {/* URL input mode */}
        {(mode === 'url' || value) && (
          <div>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="url"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                />
              </div>
              {/* Switch to upload */}
              <button
                type="button"
                onClick={() => { onChange(''); setMode('upload'); }}
                title="Upload from device instead"
                className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-300 transition-all"
              >
                <FiUpload className="text-sm" />
              </button>
            </div>
            {!value && (
              <button type="button" onClick={() => setMode('choose')}
                className="text-xs text-slate-400 hover:text-slate-600 mt-2 transition-colors">
                ← Back
              </button>
            )}
          </div>
        )}

        {/* Preview */}
        {value && (
          <img
            src={value}
            alt={`preview ${index + 1}`}
            className="w-full h-40 object-cover rounded-xl bg-slate-100"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
      </div>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────
const AdminTourForm = () => {
  const { id } = useParams();
  const isEdit  = Boolean(id);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [form, setForm]       = useState(emptyForm);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [serverError, setServerError] = useState('');

  // Load existing tour when editing
  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const res = await apiFetch(`/api/tours/${id}`);
        const t = res.data;
        setForm({
          title:       t.title || '',
          destination: t.destination || '',
          country:     t.country || 'India',
          price:       t.price || '',
          rating:      t.rating || '',
          duration:    t.duration || '',
          tourType:    t.tourType || '',
          description: t.description || '',
          images:      t.images?.length ? t.images : [''],
          highlights:  t.highlights?.length ? t.highlights : [''],
          facilities:  t.facilities || [],
          itinerary:   t.itinerary?.length
            ? t.itinerary.sort((a, b) => a.day - b.day)
            : [{ day: 1, title: '', description: '' }],
        });
      } catch {
        setServerError('Failed to load tour data');
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, isEdit]);

  // ── Validation ─────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title       = 'Title is required';
    if (!form.destination.trim()) e.destination = 'Destination is required';
    if (!form.country.trim())     e.country     = 'Country is required';
    if (!form.price || Number(form.price) <= 0) e.price = 'Valid price is required';
    if (!form.tourType)           e.tourType    = 'Tour type is required';
    if (!form.duration.trim())    e.duration    = 'Duration is required';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  };

  // ── Generic field change ───────────────────────────────────────
  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // ── Array field helpers ────────────────────────────────────────
  const updateArray = (field, index, value) => {
    const arr = [...form[field]];
    arr[index] = value;
    setForm((prev) => ({ ...prev, [field]: arr }));
  };

  const addArrayItem = (field, defaultValue) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], defaultValue] }));
  };

  const removeArrayItem = (field, index) => {
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  // ── Itinerary ─────────────────────────────────────────────────
  const updateItinerary = (index, key, value) => {
    const arr = form.itinerary.map((item, i) => i === index ? { ...item, [key]: value } : item);
    setForm((prev) => ({ ...prev, itinerary: arr }));
  };

  const addDay = () => {
    const nextDay = form.itinerary.length + 1;
    setForm((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: nextDay, title: '', description: '' }],
    }));
  };

  const removeDay = (index) => {
    const arr = form.itinerary.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 }));
    setForm((prev) => ({ ...prev, itinerary: arr }));
  };

  // ── Facilities toggle ─────────────────────────────────────────
  const toggleFacility = (facility) => {
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setServerError('');

    const payload = {
      ...form,
      price:      Number(form.price),
      rating:     form.rating ? Number(form.rating) : 0,
      images:     form.images.filter((v) => v.trim()),
      highlights: form.highlights.filter((v) => v.trim()),
      itinerary:  form.itinerary.filter((d) => d.title.trim()),
    };

    try {
      if (isEdit) {
        await apiFetch(`/api/admin/tours/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch('/api/admin/tours', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
          body: JSON.stringify(payload),
        });
      }
      navigate('/admin/tours');
    } catch (err) {
      setServerError(err.message || 'Failed to save tour. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4 mb-6"
      >
        <Link
          to="/admin/tours"
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <FiArrowLeft className="text-lg" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isEdit ? 'Edit Tour' : 'Add New Tour'}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {isEdit ? 'Update the tour details below' : 'Fill in the details to create a new tour package'}
          </p>
        </div>
      </motion.div>

      {/* Server error */}
      {serverError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
          <FiAlertCircle className="shrink-0" />
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        {/* ── Basic Info ─────────────────────────────────────── */}
        <SectionCard title="Basic Information" icon={FiList}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label required>Tour Title</Label>
              <Input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Rajasthan Royal Heritage" error={errors.title} />
              {errors.title && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" /> {errors.title}</p>}
            </div>

            <div>
              <Label required>Destination</Label>
              <Input value={form.destination} onChange={(e) => set('destination', e.target.value)} placeholder="e.g. Jaipur" error={errors.destination} />
              {errors.destination && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" /> {errors.destination}</p>}
            </div>

            <div>
              <Label required>Country</Label>
              <Input value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="e.g. India" error={errors.country} />
              {errors.country && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" /> {errors.country}</p>}
            </div>

            <div>
              <Label required>Price (₹)</Label>
              <Input type="number" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="e.g. 24999" min={0} error={errors.price} />
              {errors.price && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" /> {errors.price}</p>}
            </div>

            <div>
              <Label>Rating (0–5)</Label>
              <Input type="number" value={form.rating} onChange={(e) => set('rating', e.target.value)} placeholder="e.g. 4.8" min={0} max={5} step={0.1} />
            </div>

            <div>
              <Label required>Duration</Label>
              <Input value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="e.g. 8 Days / 7 Nights" error={errors.duration} />
              {errors.duration && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" /> {errors.duration}</p>}
            </div>

            <div>
              <Label required>Tour Type</Label>
              <select
                value={form.tourType}
                onChange={(e) => set('tourType', e.target.value)}
                className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all cursor-pointer appearance-none ${errors.tourType ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
              >
                <option value="">Select type</option>
                {TOUR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.tourType && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" /> {errors.tourType}</p>}
            </div>

            <div className="sm:col-span-2">
              <Label required>Description</Label>
              <Textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe the tour experience..." rows={4} error={errors.description} />
              {errors.description && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" /> {errors.description}</p>}
            </div>
          </div>
        </SectionCard>

        {/* ── Images ────────────────────────────────────────── */}
        <SectionCard title="Images" icon={FiImage}>
          <p className="text-xs text-slate-400 mb-4">Upload from your device or paste an image URL. Max 6 images, 5MB each.</p>
          <div className="space-y-4">
            {form.images.map((url, i) => (
              <ImageInput
                key={i}
                index={i}
                value={url}
                getToken={getToken}
                onChange={(val) => updateArray('images', i, val)}
                onRemove={form.images.length > 1 ? () => removeArrayItem('images', i) : null}
              />
            ))}
            {form.images.length < 6 && (
              <button
                type="button"
                onClick={() => addArrayItem('images', '')}
                className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                <FiPlus /> Add Another Image
              </button>
            )}
          </div>
        </SectionCard>

        {/* ── Highlights ────────────────────────────────────── */}
        <SectionCard title="Highlights" icon={FiList}>
          <div className="space-y-3">
            {form.highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={h}
                  onChange={(e) => updateArray('highlights', i, e.target.value)}
                  placeholder={`Highlight ${i + 1}`}
                />
                {form.highlights.length > 1 && (
                  <button type="button" onClick={() => removeArrayItem('highlights', i)}
                    className="p-2.5 rounded-xl text-red-400 hover:bg-red-50 transition-colors">
                    <FiTrash2 />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('highlights', '')}
              className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
              <FiPlus /> Add Highlight
            </button>
          </div>
        </SectionCard>

        {/* ── Facilities ────────────────────────────────────── */}
        <SectionCard title="Facilities Included" icon={FiCheckSquare}>
          <div className="flex flex-wrap gap-3">
            {ALL_FACILITIES.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleFacility(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  form.facilities.includes(f)
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* ── Itinerary ─────────────────────────────────────── */}
        <SectionCard title="Day-by-Day Itinerary" icon={FiCalendar}>
          <div className="space-y-4">
            {form.itinerary.map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                      {item.day}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">Day {item.day}</span>
                  </div>
                  {form.itinerary.length > 1 && (
                    <button type="button" onClick={() => removeDay(i)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                      <FiTrash2 className="text-sm" />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    value={item.title}
                    onChange={(e) => updateItinerary(i, 'title', e.target.value)}
                    placeholder="Day title (e.g. Arrival in Jaipur)"
                  />
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItinerary(i, 'description', e.target.value)}
                    placeholder="What happens this day..."
                    rows={2}
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addDay}
              className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
              <FiPlus /> Add Day
            </button>
          </div>
        </SectionCard>

        {/* ── Actions ───────────────────────────────────────── */}
        <div className="flex items-center gap-4 pb-8">
          <Link
            to="/admin/tours"
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-orange-500/30"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FiSave />
                {isEdit ? 'Update Tour' : 'Create Tour'}
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminTourForm;
