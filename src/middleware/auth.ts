// // middleware/auth.js
// export default async function ({ store, redirect, route }) {
//   const loginUrl = route.path === '/login';
//   const indexUrl = route.path === '/';
//   const chkLogin = await store.dispatch('auth/chkLogin');

//   if (chkLogin.status && (loginUrl || indexUrl)) {
//     redirect('/home');
//   } else if (!chkLogin.status && !loginUrl) {
//     redirect('/login');
//   }
// }
