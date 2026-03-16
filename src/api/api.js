import axios from "axios";
import { promise } from "zod";

const baseURL = "http://localhost:4001";
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
  (error) => promise.reject(error),
);
