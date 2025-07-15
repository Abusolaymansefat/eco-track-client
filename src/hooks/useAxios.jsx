import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// ✅ Add JWT to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxios = () => axiosInstance;

export default useAxios;
