import Vue from 'vue'
import VueRouter from 'vue-router'
import userCenterRoutes from './modules/userCenter.js'
import userRoutes from './modules/user.js'
import adminRoutes from './modules/admin.js'
import hospitalRoutes from './modules/hospitalCenter.js'
import notificationRoute from './modules/notificationCenter.js'

// import petAdoptRoutes from './modules/petAdopt.js'
// import store from '@/store'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [
         {
           path: '/home',
           name: 'home',
           meta: {
             title: '首页 | 宠圈社区'
           },
           component: () => import('@/views/home.vue')
         },
         {
           path: '/register-page',
           name: 'register-page',
           props: router => ({
             userType: router.query.userType
           }),
           meta: {
             title: '注册页 | 宠圈社区'
           },
           component: () => import('@/views/register-page.vue')
         },
         {
           path: '/find-psd-back',
           name: 'find-psd-back',
           props: router => ({
             userType: router.query.userType
           }),
           meta: {
             title: '找回密码 | 宠圈社区'
           },
           component: () => import('@/views/user/find-psd-back.vue')
         },
         {
           path: '/',
           name: 'welcome',
           meta: {
             title: '欢迎 | 宠圈社区'
           },
           component: () => import('@/views/welcome.vue')
         },
         {
           path: '/pet-adopt',
           name: 'pet-adopt',
           redirect: '/pet-adopt/adopt-home',
           meta: {
             title: '领养 | 宠圈社区'
           },
           component: () => import('@/views/pet-adopt.vue'),
           children: [
             {
               path: 'adopt-home',
               name: 'adopt-home',
               meta: {
                 title: '领养页'
               },
               component: () => import('@/views/pet-adopt/adopt-home.vue')
             },
             {
               path: 'adopt-info/:id',
               name: 'adopt-info',
               props: router => ({
                 id: router.params.id
               }),
               meta: {
                 title: '领养信息详情'
               },
               component: () => import('@/views/pet-adopt/adopt-info.vue')
             },

             {
               path: 'sponsor-adopt',
               name: 'sponsor-adopt',
               meta: {
                 role: ['user', 'volunteer'],
                 title: '发布领养'
               },
               component: () => import('@/views/pet-adopt/sponsor-adopt.vue')
             },
             {
               path: 'edit-adopt/:id',
               name: 'edit-adopt',
               props: router => ({
                 id: router.params.id
               }),
               meta: {
                 role: ['user', 'volunteer'],
                 title: '编辑领养信息'
               },
               component: () => import('@/views/pet-adopt/edit-adopt.vue')
             }
           ]
         },
         {
           path: '/pet-help',
           name: 'pet-help',
           redirect: '/pet-help/pet-help-home',
           component: () => import('@/views/pet-help.vue'),
           children: [
             {
               path: 'pet-help-home',
               name: 'pet-help-home',
               meta: {
                 title: '帮助众筹 | 宠圈社区'
               },
               component: () => import('@/views/pet-help/pet-help-home.vue')
             },
             {
               path: 'pet-help-info/:id',
               name: 'pet-help-info',
               props: router => ({
                 id: router.params.id
               }),
               meta: {
                 title: '众筹页 | 宠圈社区'
               },
               component: () => import('@/views/pet-help/pet-help-info.vue')
             }
           ]
         },
         {
           path: '/news-information',
           name: 'news-information',
           redirect: '/news-information/news-home',
           meta: {},
           component: () => import('@/views/news-information.vue'),
           children: [
             {
               path: 'news-home',
               name: 'news-home',
               meta: {
                 title: '资讯 | 宠圈社区'
               },
               component: () => import('@/views/news/news-home.vue')
             },
             {
               path: 'news-info/:id',
               name: 'news-info',
               props: router => ({
                 id: router.params.id
               }),
               meta: {
                 title: '资讯详情 | 宠圈社区'
               },
               component: () => import('@/views/news/news-info.vue')
             }
           ]
         },
         {
           path: '/admin-login',
           name: 'admin-login',
           component: () => import('@/views/admin/admin-login.vue'),
           meta: {
             title: '管理员登录 | 宠圈社区'
           }
         },
         {
           path: '/hospital-login',
           name: 'hospital-login',
           component: () => import('@/views/hospital/hospital-login.vue'),
           meta: {
             title: '医院登录 | 宠圈社区'
           }
         },
         {
           path: '/search-content',
           name: 'search-content',
           props: router => ({
             searchVal: router.query.searchVal
           }),
           component: () => import('@/views/notification/search-content.vue'),
           meta: {
             title: '搜索结果 | 宠圈社区'
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
             title: '编辑资讯',
             role: ['volunteer', 'admin']
           }
         }
       ]
export const asyncRouterMap = [
  ...userRoutes,
  ...userCenterRoutes,
  ...adminRoutes,
  ...notificationRoute,
  ...hospitalRoutes
]

const router = new VueRouter({
  // linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

export default router
