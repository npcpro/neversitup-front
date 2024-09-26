import { defineStore } from 'pinia';
import { userRepository } from '@/repositories/userRepository';

interface User {
  id: number;
  name: string;
  email: string;
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  
  actions: {
    // Login action
    async login(username: string, password: string) {
      try {
        const userData = await userRepository.login({ username, password });
        this.user = userData;
        this.isAuthenticated = true;
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    
    // Logout action
    async logout() {
      try {
        await userRepository.logout();
        this.user = null;
        this.isAuthenticated = false;
      } catch (error) {
        throw new Error('Logout failed');
      }
    },
  },
  
  getters: {
    // Example getter to check if the user is authenticated
    isLoggedIn: (state) => !!state.isAuthenticated,
  },
});
