// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    setToken(token);
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_ISLOGIN: (state, isLogin) => {
    state.isLogin = isLogin;
    window.sessionStorage.setItem('isLogin', isLogin);
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      /*User.login({ userName: username.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response);
        commit('SET_ISLOGIN', true);
        resolve(response);
      }).catch(error => {
        reject(error);
      })*/
      commit('SET_TOKEN', 'admin-token');
      resolve();
    })
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      /*User.getInfo().then(response => {
        const { name } = response
        const roles = ['admin'];
        const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
        commit('SET_NAME', name);
        commit('SET_AVATAR', avatar);
        commit('SET_ROLES', roles);
        resolve(response);
      }).catch(error => {
        window.sessionStorage.clear();
        reject(error);
      })*/
      const name = 'admin';
      const roles = ['admin'];
      const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
      commit('SET_NAME', name);
      commit('SET_AVATAR', avatar);
      commit('SET_ROLES', roles);
      resolve();
    })
  },
  logout({ commit, rootState }) {
    return new Promise((resolve) => {
      resetRouter();
      commit('SET_TOKEN', '');
      commit('SET_NAME', '');
      commit('SET_AVATAR', '');
      commit('SET_ROLES', []);
      window.localStorage.clear();
      window.sessionStorage.clear();
      if (rootState.app.device !== 'mobile' && !rootState.app.sidebar.withoutAnimation) {
        commit('app/TO_TURE', null, { root: true });
      }
      resolve();
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
