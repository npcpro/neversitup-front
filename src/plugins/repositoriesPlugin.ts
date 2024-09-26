import { defineNuxtPlugin } from '#app';
import { todoRepository } from '@/repositories/todoRepository';

export default defineNuxtPlugin((nuxtApp) => {
  // Inject $axios into the repository
  const repositories = {
    todo: todoRepository(nuxtApp.$axios), // Inject $axios directly into the repository
  };

  // Provide repositories globally as $repositories
  nuxtApp.provide('repositories', repositories);
});
