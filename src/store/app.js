export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: sessionStorage.getItem('sidebarStatus')
        ? !!+sessionStorage.getItem('sidebarStatus')
        : false,
      withoutAnimation: true
    },
    userLoginDialogPop: true
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        sessionStorage.setItem('sidebarStatus', 1)
      } else {
        sessionStorage.setItem('sidebarStatus', 0)
      }
      console.log(state.sidebar.opened)
    },
    CLOSE_SIDEBAR(state, withoutAnimation) {
      sessionStorage.setItem('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    }
  }
}
