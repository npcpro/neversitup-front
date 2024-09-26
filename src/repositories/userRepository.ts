import axiosInstance from '../api/axiosInstance';
import { Login } from '../interfaces/user';
export const userRepository = () => ({
  async login(data: Login) {
    return await axiosInstance.post('/auth/login', data);
  },
});
