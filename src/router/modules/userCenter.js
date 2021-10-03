const userCenter = [
  /* 用户中心 */
  {
    path: '/user-center',
    redirect: '/user-center/profile',
    name: 'user-center',
    meta: {
      title: '用户中心 | 宠圈社区',
      role: ['user', 'volunteer']
    },
    component: () => import('@/views/user/user-center.vue'),
    children: [
      {
        path: 'profile',
        redirect: '',
        name: '个人资料',
        meta: {
          title: ' 个人资料 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/Profile.vue')
      },
      {
        path: 'my-collect',
        name: '我的收藏',
        meta: {
          title: ' 我的收藏 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/MyCollect.vue')
      },
      {
        path: 'my-posts',
        name: '我发布的资讯',
        meta: {
          title: ' 我发布的资讯 | 宠圈社区',
          role: ['volunteer']
        },
        component: () => import('@/components/UserCenter/MyPosts.vue')
      },
      {
        path: 'my-follow',
        name: '我的关注',
        meta: {
          title: ' 我的关注 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/MyFollow.vue')
      },
      {
        path: 'my-fans',
        name: '我的粉丝',
        meta: {
          title: ' 我的粉丝 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/MyFans.vue')
      },
      {
        path: 'my-pets',
        name: '我的宠物',
        meta: {
          title: ' 我的宠物 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/MyPets.vue')
      },
      {
        path: 'my-order',
        name: '我的订单',
        meta: {
          title: ' 我的订单 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/MyOrder.vue')
      },

      {
        path: 'pet-info/:id',
        name: '宠物详情',
        props: router => ({
          id: router.params.id
        }),
        meta: {
          title: ' 宠物详情 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/Pet/PetInfo.vue')
      },
      {
        path: 'order-info/:id',
        name: '订单详情',
        props: router => ({
          id: router.params.id
        }),
        meta: {
          title: ' 订单详情 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/OrderInfo.vue')
      },
      {
        path: 'add-pet',
        name: '添加宠物',
        meta: {
          title: ' 添加宠物 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/Pet/AddPet.vue')
      },
      {
        path: 'change-my-psd',
        name: '修改密码',
        meta: {
          title: ' 修改密码 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/ChangeMyPsd.vue')
      },
      {
        path: 'change-pay-psd',
        name: '设置支付密码',
        meta: {
          title: ' 设置支付密码 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/ChangePayPsd.vue')
      },
      {
        path: 'authentication',
        name: '实名认证',
        meta: {
          title: '实名认证 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/Authentication.vue')
      },
      {
        path: 'edit-pro-file',
        meta: {
          title: ' 修改资料 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/EditProFile.vue')
      },
      {
        path: 'my-adopts-posts',
        meta: {
          title: ' 我发布的领养 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/MyAdoptPosts.vue')
      },
      {
        path: 'my-adopts',
        meta: {
          title: ' 我的领养 | 宠圈社区',
          role: ['user', 'volunteer']
        },
        component: () => import('@/components/UserCenter/MyAdopts.vue')
      }
    ]
  }
]

export default userCenter
