import { defineStore } from 'pinia';
import { userRepository } from '../repositories/userRepository';
import jwtDecode from 'jwt-decode';
import { Login, Register } from '../interfaces/user';
const user = userRepository();

export const useUserStore = defineStore('userStore', {
  state: () => ({
    id: null as String | null,
    isAuthenticated: false,
    accessToken: null as string | null
  }),
  
  actions: {
    async register(username: string, password: string) {
      try {
        const data: Register = { username, password }
        const rs = await user.register(data);
          return rs.data?.isSuccess ? true : false
      } catch (error: any) {
          throw error.response.data;
      }
    },
    async login(username: string, password: string) {
      try {
        const data: Login = { username, password }
        const rs = await user.login(data);
        if(rs.data?.access_token) {
          localStorage.setItem('access_token', rs.data.access_token);
          this.loadUserFromLocalStorage();
          return true;
        } else {
          return false
        }
      } catch (error) {
        console.log(error, 'error');
        return false;
      }
    },
    async logout() {
      try {
        this.id = null;
        this.isAuthenticated = false;
        this.accessToken = null;
        localStorage.removeItem('access_token');
      } catch (error) {
        throw new Error('Logout failed');
      }
    },

    loadUserFromLocalStorage() {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          // console.log(new Date().getTime() < new Date(decodedToken.exp), '00');
          // if(1) {
          // console.log(decodedToken,'decodedToken');
          this.id = decodedToken.id;
          this.accessToken = decodedToken.access_token;
          this.isAuthenticated = true;
          // } else {
          //   throw new Error('Token expired');
          // }
        } catch (error) {
          this.logout();
        }
      }
    },
  },
  
  getters: {
    isLoggedIn: (state) => !!state.isAuthenticated,
  },
});
