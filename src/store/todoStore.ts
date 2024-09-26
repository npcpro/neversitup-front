import { defineStore } from 'pinia';
import { todoRepository } from '../repositories/todoRepository';

const todo = todoRepository();

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [] as Todo[],
    selectedTodo: null as Todo | null,
  }),

  actions: {
    async get() {
        const rs = await todo.getAll();
        return rs.data;
    },
    async add(data: Todo) {
        const rs = await todo.add(data);
        return rs.data;
    },
    async edit(id: string, data: Todo) {
        const rs = await todo.updateById(id, data);
        return rs.data;
    },
    async delete(id: string) {
        const rs = await todo.deleteById(id);
        return rs.data;
    },
  },
});
