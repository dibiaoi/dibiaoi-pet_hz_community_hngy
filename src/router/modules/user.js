const userRoutes = [
  /*用户 */
  {
    path: '/user',
    name: 'user',
    meta: {
      role: ['user', 'volunteer', 'hospital']
    },
    component: () => import('@/views/user/user.vue'),
    children: [
      {
        path: 'personal-page/:id',
        name: 'personal-page',
        // props:'id',
        props: router => ({
          id: router.params.id
        }),
        meta: {
          title: '个人主页 | 宠圈社区',
          role: ['user', 'volunteer', 'hospital']
        },
        component: () => import('@/views/user/personal-page.vue')
      },

      {
        path: '/user/news-post-page',
        name: 'news-post-page',
        component: () => import('@/views/news/news-post-page.vue'),
        meta: {
          title: '发布资讯 | 宠圈社区',
          role: ['volunteer', 'admin']
        }
      },
      {
        path: '/news-edit-page/:newsId',
        name: 'news-edit-page',
        // props:'id',
        props: router => ({
          newsId: router.params.newsId
        }),
        component: () => import('@/views/news/news-edit-page.vue'),
        meta: {
          title: '编辑资讯 | 宠圈社区',
          role: ['volunteer', 'admin']
        }
      }
    ]
  }
]

export default userRoutes
