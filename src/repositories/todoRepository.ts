import axiosInstance from '../api/axiosInstance';
import { Todo } from '../interfaces/todo';

export const todoRepository = () => ({
  async getAll() {
    return await axiosInstance.get('/todo');
  },
  async getById(id: string) {
    return await axiosInstance.get('/todo/' + id);
  },
  async add(data: Todo) {
    return await axiosInstance.post('/todo', data);
  },
  async updateById(id: string, data: Todo) {
    return await axiosInstance.patch('/todo/'+ id, data);
  },
  async deleteById(id: string) {
    return await axiosInstance.delete('/todo/'+ id);
  }
});
