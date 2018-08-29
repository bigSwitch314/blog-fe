// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'iview/dist/styles/iview.css'
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import service from './service/index.js'
import fastClick from 'fastclick'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import iView from 'iview'

Vue.config.productionTip = false
Vue.prototype.$ajax = service.ajax
fastClick.attach(document.body)

// vueRouter跳转后回到顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
  document.documentElement.scrollTop = document.body.scrollTop = 0;
})

// LoadingBar加载进度条
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});
router.afterEach(route => {
  iView.LoadingBar.finish();
});

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
