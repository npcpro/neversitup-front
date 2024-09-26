import { defineNuxtPlugin } from '#app';
import { todoRepository } from '@/repositories/todoRepository'; // Import repository

export default defineNuxtPlugin((nuxtApp) => {
  // Inject axios globally into the Nuxt app
  const repositories = {
    todo: todoRepository(nuxtApp.$axios), // Pass $axios to the repository
  };

  nuxtApp.provide('repositories', repositories); // Provide repositories globally
});

