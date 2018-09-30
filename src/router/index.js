import Vue from 'vue'
import Router from 'vue-router'
import Home from './home';

Vue.use(Router)

export default new Router({
    scrollBehavior(to, from, savedPosition) {
      return {
        x: 0,
        y: 0
     }
    },
    mode: 'history',
    routes: [
      Home,
      {
        path: '/test',
        name: '测试',
        component: () => import('@/pages/test'),
        children: [

        ]
      },
      {
        path: '/admin/index/markdown',
        name: 'markdown',
        component: () => import('@/pages/admin/index/markdown')
      },
      {
        path: '/abace/login',
        name: '测试项目登录页面',
        component: () => import('@/pages/abace/login')
      },
      {
        path: '/abace/index',
        name: '测试项目',
        component: () => import('@/pages/abace/index'),
        children: [
          {
            path: '',
            name: '默认页面',
            component: () => import('@/pages/abace/components/search')
          },
          {
            path: 'customerList',
            name: '客户列表',
            component: () => import('@/pages/abace/components/customerList')
          },
          {
            path: 'customerAdd',
            name: '客户添加',
            component: () => import('@/pages/abace/components/customerAdd')
          },
          {
            path: 'customerEdit',
            name: '客户编辑',
            component: () => import('@/pages/abace/components/customerEdit')
          },
          {
            path: 'tagList',
            name: '标签列表',
            component: () => import('@/pages/abace/components/tagList')
          },
          {
            path: 'companyList',
            name: '公司列表',
            component: () => import('@/pages/abace/components/companyList')
          }
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
            path: 'categoryEdit',
            name: '编辑分类',
            component: () => import('@/pages/admin/index/components/content/categoryEdit')
          },
          {
            path: 'labelAdd',
            name: '添加标签',
            component: () => import('@/pages/admin/index/components/content/labelAdd')
          },
          {
            path: 'labelList',
            name: '标签列表',
            component: () => import('@/pages/admin/index/components/content/labelList')
          },
          {
            path: 'labelEdit',
            name: '编辑标签',
            component: () => import('@/pages/admin/index/components/content/labelEdit')
          },
          {
            path: 'articleAdd',
            name: 'articleAdd',
            component: () => import('@/pages/admin/index/components/content/articleAdd')
          },
          {
            path: 'articleList',
            name: '默认文章列表',
            component: () => import('@/pages/admin/index/components/content/articleList')
          },
          {
            path: 'articleEdit',
            name: 'articleEdit',
            component: () => import('@/pages/admin/index/components/content/articleEdit')
          },
        ]
      }, 
    ]
})