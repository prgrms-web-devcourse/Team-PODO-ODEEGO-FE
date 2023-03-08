import axios from "axios";
import { getLocalStorage } from "@/utils/storage";

// const API_URL = process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO;

const axiosInstanceWitToken = axios.create({
  baseURL: "",
  timeout: 2000, // request timeout
});

const APIError = (message: string, status: number) => {
  return {
    message,
    status,
  };
};

// request interceptor with token
axiosInstanceWitToken.interceptors.request.use(
  (config) => {
    const odeegoToken = getLocalStorage("token");
    const kakaoToken = getLocalStorage("logoutToken");

    if (odeegoToken) {
      config.headers["Authorization"] = "Bearer " + odeegoToken;
      config.headers["Content-Type"] = "application/json";
    } else if (kakaoToken && !odeegoToken) {
      config.headers["Authorization"] = "Bearer " + kakaoToken;
    }
    return config;
  },
  (error) => {
    const status = error.response?.status || 500;
    switch (status) {
      case 401: {
        return Promise.reject(APIError(error.message, 409));
      }
      // permission related issues
      case 403: {
        return Promise.reject(APIError(error.message, 409));
      }
      // bad request
      case 400: {
        return Promise.reject(APIError(error.message, 400));
      }

      // not found
      case 404: {
        return Promise.reject(APIError(error.message, 404));
      }

      // conflict
      case 409: {
        return Promise.reject(APIError(error.message, 409));
      }

      // unprocessable
      case 422: {
        return Promise.reject(APIError(error.message, 422));
      }

      // generic api error
      default: {
        return Promise.reject(APIError(error.message, 500));
      }
    }
  }
);

export { axiosInstanceWitToken };
