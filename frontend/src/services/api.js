import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const APP_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");
export const UPLOADS_URL = `${APP_BASE_URL}/uploads`;
export const FALLBACK_FOOD_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ccfbf1" />
        <stop offset="100%" stop-color="#e2e8f0" />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#g)" rx="24" />
    <circle cx="400" cy="210" r="72" fill="#14b8a6" opacity="0.18" />
    <rect x="220" y="315" width="360" height="22" rx="11" fill="#0f172a" opacity="0.12" />
    <rect x="270" y="355" width="260" height="18" rx="9" fill="#0f172a" opacity="0.08" />
    <text x="400" y="225" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#0f172a">SharePlate</text>
    <text x="400" y="255" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Food post image</text>
  </svg>
`)}`;

const API = axios.create({
  baseURL: API_BASE_URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;
