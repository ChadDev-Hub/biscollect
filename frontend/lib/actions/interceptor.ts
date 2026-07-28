import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASESERVERURL,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASESERVERURL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshApi.get(`/v1/biscollect/refresh/token`);
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("LoginStatus");
        localStorage.removeItem("User");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
