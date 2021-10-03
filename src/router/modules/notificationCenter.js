const notificationRoutes = [
  {
    path: '/notification-center',
    name: 'notification-center',
    redirect: '/notification-center/collect',
    meta: {
      role: ['user', 'volunteer', 'hospital']
    },
    component: () => import('@/views/notification/notification-center.vue'),
    children: [
      {
        path: 'collect',
        redirect: '',
        name: '收藏',
        meta: {
          title: '收藏',
          role: ['user', 'volunteer', 'hospital']
        },
        component: () => import('@/views/notification/n-collect.vue')
      },
      {
        path: 'remark',
        name: '收藏',
        meta: {
          title: '收藏',
          role: ['user', 'volunteer', 'hospital']
        },
        component: () => import('@/views/notification/n-remark.vue')
      },
      {
        path: 'follow',
        name: '关注',
        meta: {
          title: '关注',
          role: ['user', 'volunteer', 'hospital']
        },
        component: () => import('@/views/notification/n-follow.vue')
      },
      {
        path: 'like',
        name: 'like',
        meta: {
          title: '点赞',
          role: ['user', 'volunteer', 'hospital']
        },
        component: () => import('@/views/notification/n-like.vue')
      },
      {
        path: 'adopt',
        name: '领养',
        meta: {
          title: '领养',
          role: ['user', 'volunteer', 'hospital']
        },
        component: () => import('@/views/notification/n-adopt.vue')
      },
      {
        path: 'pet-help',
        name: '众筹',
        meta: {
          title: '众筹',
          role: ['user', 'volunteer', 'hospital']
        },
        component: () => import('@/views/notification/n-pet-help.vue')
      },
      {
        path: 'news',
        name: '资讯',
        meta: {
          title: '资讯',
          role: ['user', 'volunteer', 'hospital']
        },
        component: () => import('@/views/notification/n-news.vue')
      },
      {
        path: 'chat',
        name: '私信',
        meta: {
          title: '私信',
          role: ['user', 'volunteer', 'hospital']
        },
        component: () => import('@/views/notification/n-chat.vue')
      }
    ]
  }
]
export default notificationRoutes
