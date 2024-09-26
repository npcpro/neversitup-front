import axiosInstance from '../api/axiosInstance';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const todoRepository = () => ({
  async getAll() {
    return await axiosInstance.get('/todo');
  },
  async getById() {
    return await axiosInstance.get('/todo');
  },
  async add() {
    return await axiosInstance.get('/todo');
  },
  async updateById() {
    return await axiosInstance.get('/todo');
  },
  async deleteById() {
    return await axiosInstance.get('/todo');
  }
});
