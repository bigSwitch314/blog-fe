import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/test',
            name: '测试',
            component: () => import('@/pages/test')
        },
        {
            path: '/admin/index',
            name: '后台首页',
            component: () => import('@/pages/admin/index/index')
        },
        
    ]
})