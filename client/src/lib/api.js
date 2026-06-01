const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const apiFetch = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }
  return data;
};

export default apiFetch;
