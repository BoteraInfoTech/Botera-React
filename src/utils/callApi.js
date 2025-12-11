import axios from "axios";
import { getToken, setToken } from "./auth";
import { BACKEND_POINT } from "./config";

let isRefreshing = false;
let failedQueue = [];

// refresh token
export const refreshToken = async () => {
  try {
    const res = await axios.post(
      `${BACKEND_POINT}/user/refreshToken`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data?.accessToken;
  } catch (error) {
    throw error;
  }
};

//  Queue handler for requests while refresh is in progress
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

//  Handle 401 response errors (retry once with refresh)
const handleResponseError = async (error, instance) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return instance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newToken = await refreshToken();
      setToken(newToken);
      processQueue(null, newToken);

      originalRequest.headers["Authorization"] = "Bearer " + newToken;
      return instance(originalRequest);
    } catch (err) {
      processQueue(err, null);
      // 🔹 Logout user if refresh fails
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
};

//  Create axios instance with interceptors
const createAxiosInstance = () => {
  const instance = axios.create();

  instance.interceptors.response.use(
    (response) => response,
    async (error) => handleResponseError(error, instance)
  );

  return instance;
};

const callAPI = async (
  apiURL,
  method = "GET",
  apiData = {},
  responseType = "json",
  config = {}
) => {
  try {
    const headers = { ...(config.headers || {}) };
    if (apiData instanceof FormData) {
      headers["Content-Type"] = undefined;
    } else {
      headers["Content-Type"] = "application/json";
    }
    const token = getToken(true);

    if (token) {
      headers.Authorization = token;
    }

    const requestSource = axios.CancelToken.source();
    const instance = createAxiosInstance();

    const response = await instance({
      url: apiURL,
      method,
      data: apiData,
      cancelToken: requestSource.token,
      headers,
      responseType,
      withCredentials: true,
      onUploadProgress: config.onUploadProgress,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default callAPI;
