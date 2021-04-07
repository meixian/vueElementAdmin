const state = {
  sidebar: {
    opened: window.sessionStorage.getItem('sidebarStatus') ? !!+window.sessionStorage.getItem('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      window.sessionStorage.setItem('sidebarStatus', 1);
    } else {
      window.sessionStorage.setItem('sidebarStatus', 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    window.sessionStorage.setItem('sidebarStatus', 0);
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TO_TURE: state => {
    state.sidebar.opened = true;
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
