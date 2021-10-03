const hospitalRoutes = [
  {
    path: '/hospital-center',
    redirect: '/hospital-center/profile',
    name: 'hospital-center',
    meta: {
      role: ['hospital']
    },
    component: () => import('@/views/hospital/hospital-center.vue'),
    children: [
      {
        path: 'profile',
        redirect: '',
        name: '医院资料',
        meta: {
          title: ' 医院资料 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/components/Hospital/HospitalProfile.vue')
      },
      {
        path: 'hospital-auth',
        name: '医院实名',
        meta: {
          title: ' 医院实名 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/views/hospital/hospital-auth.vue')
      },
      {
        path: 'hospital-change-psd',
        name: '修改密码',
        meta: {
          title: ' 修改密码 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/views/hospital/hospital-change-psd.vue')
      },
      {
        path: 'hospital-edit-info',
        name: '编辑医院信息',
        meta: {
          title: ' 编辑医院信息 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/views/hospital/hospital-edit-info.vue')
      },
      {
        path: 'hospital-services',
        name: '医院服务',
        meta: {
          title: ' 医院服务 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/views/hospital/hospital-services.vue')
      },
      {
        path: 'hospital-create-service',
        name: '添加新服务',
        meta: {
          title: ' 添加新服务 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/views/hospital/hospital-create-service.vue')
      },
      {
        path: 'hospital-service-info',
        name: '服务详情',
        props: route => ({
          serviceId: route.query.serviceId
        }),
        meta: {
          title: ' 服务详情 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/views/hospital/hospital-service-info.vue')
      },
      {
        path: 'create-pet-help',
        name: '发起宠物帮助众筹',
        props: route => ({
          serviceId: route.query.serviceId
        }),
        meta: {
          title: ' 发起宠物帮助众筹 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/views/hospital/create-pet-help.vue')
      },
      {
        path: 'edit-pet-help/:id',
        name: '修改帮助众筹信息',
        props: router => ({
          id: router.params.id
        }),
        meta: {
          title: ' 修改帮助众筹信息 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/views/hospital/edit-pet-help.vue')
      },
      {
        path: 'pet-help-list',
        name: '帮助众筹列表',
        meta: {
          title: ' 帮助众筹列表 | 宠圈社区',
          role: ['hospital']
        },
        component: () => import('@/views/hospital/pet-help-list.vue')
      }
    ]
  }
]

export default hospitalRoutes
