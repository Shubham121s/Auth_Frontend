import axios from "axios";

// Environment se baseURL lena
const baseURL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: `${baseURL}/api`, // ensures /api prefix
  withCredentials: true,     // cookies/session ke liye
});

// Token attach karna (agar ho to)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;


