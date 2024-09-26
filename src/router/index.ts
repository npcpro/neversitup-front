/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */


import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '../store/userStore';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore(); 
  userStore.loadUserFromLocalStorage();
  const isLoggedIn = userStore.isLoggedIn;
  const loginUrl = to.path === '/login';
  const registerUrl = to.path === '/register';
  const indexUrl = to.path === '/';

  
  if (isLoggedIn && (loginUrl || indexUrl)) {
    next({ path: '/todo' });
  }
  
  else if (!isLoggedIn && !loginUrl && !registerUrl) {
    next({ path: '/login' });
  }
  
  else {
    next();
  }
});


router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
