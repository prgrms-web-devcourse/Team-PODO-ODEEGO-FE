import axios from "axios";
import { getLocalStorage } from "@/utils/storage";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 2000, // request timeout
});

// request interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getLocalStorage("token");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
