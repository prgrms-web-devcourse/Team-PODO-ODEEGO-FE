import axios from "axios";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/storage";

// const API_URL = process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO;

const axiosInstanceWitToken = axios.create({
  baseURL: "",
  timeout: 2000, // request timeout
});

const axiosRefreshToken = axios.create({
  baseURL: "",
  timeout: 2000,
});

const APIError = (message: string, status: number) => {
  return {
    message,
    status,
  };
};

const getRefreshToken = async () => {
  try {
    // 클라이언트가 401 에러 받았을때 refresh 요청을 보낸뒤에 이전에 보냈던 요청을 재요청하는 함수
    const {
      data: { accessToken, refreshToken },
    } = await axios.get<{ accessToken: string; refreshToken: string | null }>(
      `REFRESH_URL`
    );

    setLocalStorage("token", accessToken);

    if (refreshToken !== null) {
      setLocalStorage("refreshToken", refreshToken);
    }

    return accessToken;
  } catch (e) {
    removeLocalStorage("token");
    removeLocalStorage("refreshToken");
  }
};

axiosRefreshToken.interceptors.response.use(
  (res) => res,

  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    if (status !== 401 || config.url === "REFRESH_URL") {
      return Promise.reject(err);
    }
    const accessToken = await getRefreshToken();

    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
  }
);

// request interceptor with token
axiosInstanceWitToken.interceptors.request.use(
  (config) => {
    const odeegoToken = getLocalStorage("token");
    const kakaoToken = getLocalStorage("logoutToken");

    if (odeegoToken) {
      config.headers["Authorization"] = "Bearer " + odeegoToken;
      config.headers["Content-Type"] = "application/json";
    } else if (kakaoToken && !odeegoToken) {
      console.log(kakaoToken);
      config.headers["Authorization"] = "Bearer " + kakaoToken;
    } else {
      config.headers["Authorization"] = "";
    }
    return config;
  },

  (error) => {
    const status = error.response?.status || 500;
    switch (status) {
      case 401: {
        return Promise.reject(APIError(error.message, 401));
      }
      // permission related issues
      case 403: {
        return Promise.reject(APIError(error.message, 403));
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
