const petAdoptRoutes = [
  {
    path: '/pet-adopt',
    name: 'pet-adopt',
    meta: {
      role: ['user', 'volunteer']
    },
    component: () => import('@/views/pet-adopt.vue'),
    children: [
      {
        path: '/sponsor-adopt',
        name: 'sponsor-adopt',
        meta: {
          role: ['user', 'volunteer']
        },
        component: () => import('@/views/pet-adopt/sponsor-adopt.vue')
      }
    ]
  }
]
export default petAdoptRoutes
