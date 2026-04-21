export default [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home/index.vue')
      }
    ]
  }
]
