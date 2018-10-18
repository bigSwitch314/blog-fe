export default {
  path: '/home/index',
  name: '默认首页',
  component: () => import('@/pages/home/index'),
  children: [
    {
      path: '',
      name: '首页',
      component:  () => import('@/pages/home/components/content/home'),
    },
    {
      path: 'home',
      name: '首页',
      component:  () => import('@/pages/home/components/content/home'),
    },
    {
      path: 'articleDetail',
      name: '文章详情',
      component:  () => import('@/pages/home/components/content/articleDetail'),
    },
    {
      path: 'category',
      name: '分类',
      component:  () => import('@/pages/home/components/content/category'),
    },
    {
      path: 'label',
      name: '标签',
      component:  () => import('@/pages/home/components/content/label'),
    },
    {
      path: 'archive',
      name: '归档',
      component:  () => import('@/pages/home/components/content/archive'),
    },
    {
      path: 'about',
      name: '关于',
      component:  () => import('@/pages/home/components/content/about'),
    },
    {
      path: 'reprint',
      name: '转载',
      component:  () => import('@/pages/home/components/content/reprint'),
    },
    {
      path: 'openSource',
      name: '开源项目',
      component:  () => import('@/pages/home/components/content/openSource'),
    }
  ]
};
