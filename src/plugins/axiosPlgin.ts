import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  // Inject $axios globally so you can use it in any file, like repositories
  nuxtApp.provide('axios', nuxtApp.$axios);
});
