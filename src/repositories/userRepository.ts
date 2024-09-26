import { NuxtAxiosInstance } from '@nuxtjs/axios';

interface LoginData {
  username: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

let $axios: NuxtAxiosInstance;

export const initializeAxios = (axiosInstance: NuxtAxiosInstance) => {
  $axios = axiosInstance;
};

export const userRepository = {
  async login(loginData: LoginData): Promise<User> {
    try {
      const response = await $axios.post('/api/login', loginData);
      return response.data; // Assume the API returns user data
    } catch (error) {
      throw new Error('Login failed');
    }
  },
  async logout(): Promise<void> {
    try {
      await $axios.post('/api/logout');
    } catch (error) {
      throw new Error('Logout failed');
    }
  },
};
