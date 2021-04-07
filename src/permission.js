import router from './router';
import store from './store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import getPageTitle from '@/utils/getPageTitle';
NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {

  NProgress.start();
  document.title = getPageTitle(to.meta.title);

  const hasToken = store.getters.token;
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) { //判断当前用户是否已拉取完user_info信息
        await store.dispatch('user/getInfo');
        await store.dispatch('permission/generateRoutes', store.getters.roles);
        router.addRoutes(store.getters.permission_routes); //动态添加可访问路由表
        next({ ...to, replace: true });
      } else {
        next(); //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (to.path !== '/dashboard') {
        next({
          path: "/login",
          query: { redirect: to.path } //把要跳转的路由path作为参数，登录成功后跳转到该路由
        });
      } else {
        next('/login')
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done();
})
