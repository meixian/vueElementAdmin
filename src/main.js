import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './utils/elementUi'; // 按需引入element-ui
import './assets/styles/index.scss'; // 全局样式
import './components/Icons'; // 自定义全局svg组件
import './permission'; // 权限控制
import $api from './api'; // 接口模块
import * as filters from './filters'; // 过滤器

Vue.prototype.$api = $api;
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
