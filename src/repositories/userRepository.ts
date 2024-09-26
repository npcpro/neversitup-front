import axiosInstance from '../api/axiosInstance';
import { Login, Register } from '../interfaces/user';
export const userRepository = () => ({
  async login(data: Login) {
    return await axiosInstance.post('/auth/login', data);
  },
  async register(data: Register) {
    return await axiosInstance.post('/users', data);
  },
});
