import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://app-orbit-server-eight.vercel.app`, 
});

// Interceptor to add token to each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;