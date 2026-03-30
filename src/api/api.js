import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
export const publicIntance = axios.create({ baseURL });

export const privateInstance = axios.create({ baseURL });

privateInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
