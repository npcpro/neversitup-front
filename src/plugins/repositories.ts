import { todoRepository } from '@/repositories/todoRepository';

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize repositories with $axios
  const repositories = {
    todoRepository: todoRepository(nuxtApp.$axios),
    // Add more repositories here if necessary
  };

  // Inject repositories into Nuxt context as $repositories
  nuxtApp.provide('repositories', repositories);
});
