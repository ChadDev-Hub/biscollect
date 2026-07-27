
import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASESERVERURL,
  withCredentials: true
});



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const baseurl = process.env.NEXT_PUBLIC_BASESERVERURL;
      await axios.post(`${baseurl}/v1/auth/token/refresh/v2`);
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
