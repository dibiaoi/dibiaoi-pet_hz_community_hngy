import router from '@/router'
import store from '@/store'
import { message } from '@/plugins/element'

const whitelist = [
  '/',
  '/home',
  '/pet-adopt',
  '/pet-help',
  '/news-information',
  '/register-page',
  '/find-psd-back',
  '/pet-adopt/adopt-home',
  '/pet-help/pet-help-home',
  '/admin-login',
  '/hospital-login',
  '/notification-center',
  '/search-content'
]

router.beforeEach((to, from, next) => {
  const userInfo = store.state.userInfo
  if (userInfo.userToken) {
    const { roles } = userInfo
    if (roles) {
      // store.dispatch('userInfo/autoLogin')
      next()
    } else {
      const { role } = userInfo
      store
        .dispatch('GenerateRoutes', { role })
        .then(addRoutes => {
          console.log(store.state.Permissions.addRouters)
          addRoutes.push(
            {
              path: '*',
              redirect: '/404'
            },
            {
              path: '/404',
              name: '404',
              meta: {
                title: '未找到 | 宠圈社区'
              },
              component: () => import('@/views/404.vue')
            }
          )
          router.addRoutes(addRoutes)
          console.log(router.options.routes)
          userInfo.roles = userInfo.role
          // next({ ...to })
          next({ ...to, replace: true })
        })
        .catch(err => {
          console.log(err)
        })
    }
  } else {
    if (whitelist.indexOf(to.path) !== -1) {
      console.log(whitelist.indexOf(to.path))
      next()
    } else {
      if (localStorage.getItem('userState') === 'false') {
        store.state.app.userLoginDialogPop = false
        message({
          message: '请登录',
          type: 'warning'
        })
      }
      next('/home')
    }
  }
})
