import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ii1PN2RXcjdJSUItOUNIVU43X1FuIiwiaWF0IjoxNzI3MjczNjIyLCJleHAiOjE3MjczNjAwMjJ9.MTvg5mxyczKlkiCQsQBWnZvwbCKZYFeCW1lKsBiG9IU'; // Example of retrieving a token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
