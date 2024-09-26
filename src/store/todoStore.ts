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
    async getTodos() {
      try {
        console.log(this,'this <==');
        const rs = await todo.getAll();
        return rs.data;
      } catch (error) {
        console.error('Failed to fetch todos', error);
      }
    },
  },
});
