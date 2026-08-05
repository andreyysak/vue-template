import { createRouter, createWebHistory } from 'vue-router';

import { authGuard } from '@/router/permissions.js';
import { createAliasRoutes } from '@/router/locales.js';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Main/index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/index.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('@/layouts/Auth/index.vue'),
    meta: { guestOnly: true },
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Auth/Login/index.vue')
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => import('@/views/Auth/Signup/index.vue')
      },
      {
        path: 'reset',
        name: 'Reset',
        component: () => import('@/views/Auth/Reset/index.vue')
      },
      {
        path: 'restore',
        name: 'Restore',
        component: () => import('@/views/Auth/Restore/index.vue')
      }
    ]
  },
  {
    path: '/500',
    name: 'server-error',
    component: () => import('@/views/500/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page-not-found',
    component: () => import('@/views/404/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: createAliasRoutes(routes)
});

router.beforeEach(authGuard);

export default router;
