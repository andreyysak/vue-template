export default [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home/HomePage.vue')
      }
    ]
  }
]
