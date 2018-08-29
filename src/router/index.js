import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior(to, from,savedPosition) {
      return {
        x: 0,
        y: 0
     }
    },
    mode: 'history',
    routes: [
        {
            path: '/test',
            name: '测试',
            component: () => import('@/pages/test'),
            children: [

            ]
        },
        {
            path: '/admin/index',
            name: '后台首页',
            component: () => import('@/pages/admin/index/index'),
            children: [
                {
                  path: '',
                  name: '默认文章列表',
                  component: () => import('@/pages/admin/index/components/content/articleList')
                },
                {
                  path: 'userList',
                  name: '用户列表',
                  component: () => import('@/pages/admin/index/components/content/userList')
                },
                {
                  path: 'userAdd',
                  name: '添加用户',
                  component: () => import('@/pages/admin/index/components/content/userAdd')
                },
                {
                  path: 'userEdit',
                  name: '编辑用户',
                  component: () => import('@/pages/admin/index/components/content/userEdit')
                },
                {
                  path: 'categoryList',
                  name: '分类列表',
                  component: () => import('@/pages/admin/index/components/content/categoryList')
                },
                {
                    path: 'categoryAdd',
                    name: '添加分类',
                    component: () => import('@/pages/admin/index/components/content/categoryAdd')
                },
                {
                  path: 'labelAdd',
                  name: '默认文章列表',
                  component: () => import('@/pages/admin/index/components/content/labelAdd')
                },
                {
                  path: 'labelList',
                  name: '默认文章列表',
                  component: () => import('@/pages/admin/index/components/content/labelList')
                },
                {
                  path: 'articleAdd',
                  name: '默认文章列表',
                  component: () => import('@/pages/admin/index/components/content/articleAdd')
                },
                {
                  path: 'articleList',
                  name: '默认文章列表',
                  component: () => import('@/pages/admin/index/components/content/articleList')
                },
            ]
        }, 
    ]
})