const adminRoutes = [
  {
    path: '/admin-home',
    name: 'admin-home',
    redirect: '/admin-user/check-all-user',
    id: 1,
    component: () => import('@/views/admin/admin-home.vue'),
    meta: {
      // title: '管理员页',
      role: ['admin']
    },
    children: [
      {
        path: '/admin-user',
        redirect: '/admin-user/check-all-user',
        name: '用户管理',
        id: 2,
        component: () => import('@/views/admin/admin-user.vue'),
        meta: {
          title: '用户管理',
          role: ['admin'],
          icon: 'el-icon-user'
        },
        children: [
          {
            path: '/admin-user/check-all-user',
            name: '所有用户',
            pid: 2,
            component: () => import('@/views/admin/check-all-user.vue'),
            meta: {
              title: '查看所有用户',
              role: ['admin']
            }
          },
          {
            path: '/admin-user/volunteer-examine',
            name: '志愿者审核',
            pid: 3,
            component: () => import('@/views/admin/volunteer-examine.vue'),
            meta: {
              title: '志愿者审核 ',
              role: ['admin']
            }
          }
        ]
      },
      {
        path: '/admin-pet-help',
        name: '众筹管理',
        id: 3,
        component: () => import('@/views/admin/admin-pet-help.vue'),
        meta: {
          title: '众筹管理',
          role: ['admin'],
          icon: 'el-icon-s-help'
        }
      },
      {
        path: '/admin-petAdopt',
        name: '领养管理',
        id: 4,
        component: () => import('@/views/admin/admin-petAdopt.vue'),
        meta: {
          title: '领养管理',
          role: ['admin'],
          icon: 'el-icon-s-goods'
        }
      },
      {
        path: '/admin-hospital',
        name: '医院管理',
        id: 5,
        component: () => import('@/views/admin/admin-hospital.vue'),
        meta: {
          title: '医院管理 ',
          role: ['admin'],
          icon: 'el-icon-school'
        }
      },
      {
        path: '/admin-news',
        redirect: '/admin-news/news-manage',
        name: '资讯管理',
        id: 6,
        component: () => import('@/views/admin/admin-news.vue'),
        meta: {
          title: '资讯管理',
          role: ['admin'],
          icon: 'el-icon-news'
        },
        children: [
          {
            path: '/admin-news/news-manage',
            name: '所有资讯',
            pid: 2,
            component: () => import('@/views/admin/news-manage.vue'),
            meta: {
              title: '所有资讯',
              role: ['admin']
            }
          }
        ]
      },
      {
        path: '/news-post-page',
        name: '发布资讯',
        pid: 3,
        component: () => import('@/views/news/news-post-page.vue'),
        meta: {
          title: '发布资讯',
          role: ['admin'],
          icon: 'el-icon-receiving'
        }
      },
      {
        path: '/admin-news/admin-lose-psd',
        name: '找回密码',
        id: 7,
        component: () => import('@/views/admin/admin-lose-psd.vue'),
        meta: {
          title: '找回密码',
          role: ['admin'],
          icon: 'el-icon-receiving'
        }
      }
    ]
  }
  /* 管理员 */
]
export default adminRoutes
