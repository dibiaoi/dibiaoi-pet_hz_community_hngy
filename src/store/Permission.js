import { asyncRouterMap, constantRouterMap } from '@/router'
import router from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    setRouters(state, routes) {
      state.addRouters = Array.prototype.slice.call(routes)
      state.routers = constantRouterMap.concat(routes)
      router.options.routes = constantRouterMap.concat(routes)
      localStorage.setItem('routesMenu', JSON.stringify(state.routers))
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const roles = []
        roles.push(data.role)
        const accessedRouters = filterAsyncRoutes(asyncRouterMap, roles)
        commit('setRouters', accessedRouters)
        resolve(accessedRouters)
      })
    }
  }
}

export default permission
