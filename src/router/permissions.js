import { useAuthStore } from '@/store/auth.js';

export const authGuard = (to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuth) {
    return { name: 'Login' };
  }

  if (to.meta.guestOnly && authStore.isAuth) {
    return { name: 'Home' };
  }
};
