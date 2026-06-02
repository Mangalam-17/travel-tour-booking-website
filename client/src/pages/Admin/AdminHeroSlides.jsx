import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiImage, FiPlus, FiTrash2, FiEdit2, FiX,
  FiAlertTriangle, FiEye, FiEyeOff, FiCheck,
  FiUpload, FiLink, FiSave, FiAlertCircle,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import apiFetch from '../../lib/api';

// ── Image picker (upload or URL) ─────────────────────────────────
const ImagePicker = ({ value, onChange, getToken }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [mode, setMode] = useState(value ? 'url' : 'choose');

  const handleFile = async (e) => {
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
      setUploadError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  if (mode === 'choose' && !value) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => setMode('upload')}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all group">
          <FiUpload className="text-2xl text-slate-400 group-hover:text-orange-500" />
          <span className="text-xs font-semibold text-slate-500 group-hover:text-orange-600">Upload file</span>
          <span className="text-xs text-slate-400">JPG, PNG, WebP · 5MB</span>
        </button>
        <button type="button" onClick={() => setMode('url')}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all group">
          <FiLink className="text-2xl text-slate-400 group-hover:text-orange-500" />
          <span className="text-xs font-semibold text-slate-500 group-hover:text-orange-600">Paste URL</span>
          <span className="text-xs text-slate-400">https://...</span>
        </button>
      </div>
    );
  }

  if (mode === 'upload' && !value) {
    return (
      <div>
        <label className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all ${uploading ? 'border-orange-300 bg-orange-50' : 'border-slate-200 hover:border-orange-400 hover:bg-orange-50'}`}>
          {uploading ? (
            <><div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span className="text-sm text-orange-600 font-medium">Uploading...</span></>
          ) : (
            <><FiUpload className="text-3xl text-slate-400" />
            <p className="text-sm font-semibold text-slate-700">Click to choose a file</p></>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
        {uploadError && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" />{uploadError}</p>}
        <button type="button" onClick={() => setMode('choose')} className="text-xs text-slate-400 hover:text-slate-600 mt-2">← Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input type="url" value={value} onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
        </div>
        <button type="button" onClick={() => { onChange(''); setMode('upload'); }}
          title="Upload instead"
          className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-orange-50 hover:text-orange-500 transition-all">
          <FiUpload className="text-sm" />
        </button>
      </div>
      {value && (
        <img src={value} alt="preview"
          className="w-full h-36 object-cover rounded-xl bg-slate-100"
          onError={(e) => { e.target.style.display = 'none'; }} />
      )}
      {!value && (
        <button type="button" onClick={() => setMode('choose')} className="text-xs text-slate-400 hover:text-slate-600">← Back</button>
      )}
    </div>
  );
};

// ── Slide form modal ─────────────────────────────────────────────
const SlideModal = ({ slide, onSave, onClose, getToken }) => {
  const isEdit = Boolean(slide?._id);
  const [form, setForm] = useState({
    image:    slide?.image    || '',
    title:    slide?.title    || '',
    subtitle: slide?.subtitle || '',
    tag:      slide?.tag      || '',
    isActive: slide?.isActive !== undefined ? slide.isActive : true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (k, v) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: '' })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.image.trim()) errs.image = 'Image is required';
    if (!form.title.trim()) errs.title = 'Title is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setServerError('');
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setServerError(err.message || 'Failed to save slide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 20 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">{isEdit ? 'Edit Slide' : 'Add New Slide'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><FiX /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          {serverError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              <FiAlertCircle className="shrink-0" />{serverError}
            </div>
          )}

          {/* Image */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Image <span className="text-red-400">*</span>
            </label>
            <ImagePicker value={form.image} onChange={(v) => set('image', v)} getToken={getToken} />
            {errors.image && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" />{errors.image}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Title <span className="text-red-400">*</span>
            </label>
            <input value={form.title} onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Discover Rajasthan"
              className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 ${errors.title ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} />
            {errors.title && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="shrink-0" />{errors.title}</p>}
          </div>

          {/* Subtitle + Tag */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Subtitle</label>
              <input value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)}
                placeholder="e.g. Land of Kings"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Tag</label>
              <input value={form.tag} onChange={(e) => set('tag', e.target.value)}
                placeholder="e.g. Heritage & Culture"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500" />
            </div>
          </div>

          {/* Active toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => set('isActive', !form.isActive)}
              className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${form.isActive ? 'bg-orange-500' : 'bg-slate-200'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${form.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm font-medium text-slate-700">
              {form.isActive ? 'Active — shown on hero' : 'Inactive — hidden from hero'}
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><FiSave />{isEdit ? 'Update' : 'Add Slide'}</>}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ── Delete modal ─────────────────────────────────────────────────
const DeleteModal = ({ slide, onConfirm, onCancel, loading }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={onCancel}>
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
      className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-start gap-4 mb-5">
        <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
          <FiAlertTriangle className="text-red-500 text-xl" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Delete Slide</h3>
          <p className="text-slate-500 text-sm mt-1">Delete <strong>"{slide?.title}"</strong>? This cannot be undone.</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium hover:bg-slate-50">Cancel</button>
        <button onClick={onConfirm} disabled={loading}
          className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
          {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Delete'}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// ── Main page ────────────────────────────────────────────────────
const AdminHeroSlides = () => {
  const { getToken } = useAuth();
  const [slides, setSlides]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [editTarget, setEditTarget]   = useState(null);  // null=closed, {}=add new, {_id,...}=edit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchSlides = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/hero-slides', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setSlides(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load slides');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => { fetchSlides(); }, [fetchSlides]);

  const handleSave = async (formData) => {
    const isEdit = Boolean(editTarget?._id);
    if (isEdit) {
      const res = await apiFetch(`/api/admin/hero-slides/${editTarget._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(formData),
      });
      setSlides((prev) => prev.map((s) => s._id === editTarget._id ? res.data : s));
    } else {
      const res = await apiFetch('/api/admin/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ ...formData, order: slides.length }),
      });
      setSlides((prev) => [...prev, res.data]);
    }
  };

  const handleToggleActive = async (slide) => {
    try {
      const res = await apiFetch(`/api/admin/hero-slides/${slide._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ isActive: !slide.isActive }),
      });
      setSlides((prev) => prev.map((s) => s._id === slide._id ? res.data : s));
    } catch (err) {
      alert(err.message || 'Failed to update');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await apiFetch(`/api/admin/hero-slides/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setSlides((prev) => prev.filter((s) => s._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message || 'Failed to delete');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <FiImage className="text-orange-500 text-2xl" />
            <h1 className="text-2xl font-bold text-slate-800">Hero Slides</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Manage the full-screen carousel on the home page.{' '}
            {!loading && <span className="font-medium text-slate-700">{slides.filter(s => s.isActive).length} active</span>}
          </p>
        </div>
        <button onClick={() => setEditTarget({})}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/30">
          <FiPlus /> Add Slide
        </button>
      </motion.div>

      {/* Slides grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">{error}</div>
      ) : slides.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-100">
          <FiImage className="text-slate-300 text-5xl mx-auto mb-3" />
          <p className="text-slate-400 font-medium mb-2">No slides yet</p>
          <button onClick={() => setEditTarget({})} className="text-orange-500 text-sm hover:underline">Add your first slide</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {slides.map((slide, idx) => (
            <motion.div key={slide._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all ${slide.isActive ? 'border-slate-100' : 'border-slate-200 opacity-60'}`}>

              {/* Image */}
              <div className="relative h-40">
                <img src={slide.image} alt={slide.title}
                  className="w-full h-full object-cover bg-slate-100"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x160?text=No+Image'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Order badge */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {idx + 1}
                </div>

                {/* Active badge */}
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${slide.isActive ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}`}>
                  {slide.isActive ? <><FiCheck className="text-xs" /> Active</> : 'Hidden'}
                </div>

                {/* Tag */}
                {slide.tag && (
                  <div className="absolute bottom-2 left-2 bg-orange-500/90 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {slide.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-slate-800 text-sm truncate">{slide.title}</h3>
                {slide.subtitle && <p className="text-slate-500 text-xs mt-0.5 truncate">{slide.subtitle}</p>}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => handleToggleActive(slide)}
                    title={slide.isActive ? 'Hide slide' : 'Show slide'}
                    className={`p-2 rounded-lg transition-colors ${slide.isActive ? 'text-green-600 hover:bg-green-50' : 'text-slate-400 hover:bg-slate-100'}`}>
                    {slide.isActive ? <FiEye className="text-sm" /> : <FiEyeOff className="text-sm" />}
                  </button>
                  <button onClick={() => setEditTarget(slide)}
                    className="p-2 rounded-lg text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    <FiEdit2 className="text-sm" />
                  </button>
                  <button onClick={() => setDeleteTarget(slide)}
                    className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors ml-auto">
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info note */}
      {!loading && slides.length > 0 && (
        <p className="text-xs text-slate-400 mt-4 text-center">
          Changes are live immediately — refresh the home page to see updates.
        </p>
      )}

      {/* Modals */}
      <AnimatePresence>
        {editTarget !== null && (
          <SlideModal
            slide={editTarget._id ? editTarget : null}
            onSave={handleSave}
            onClose={() => setEditTarget(null)}
            getToken={getToken}
          />
        )}
        {deleteTarget && (
          <DeleteModal
            slide={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleteLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHeroSlides;
