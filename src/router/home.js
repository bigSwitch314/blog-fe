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
      path: 'allCategoryStats',
      name: '所有分类统计',
      component:  () => import('@/pages/home/components/content/allCategoryStats'),
    },
    {
      path: 'oneCategoryStats',
      name: '某个分类统计',
      component:  () => import('@/pages/home/components/content/oneCategoryStats'),
    },
    {
      path: 'label',
      name: '标签',
      component:  () => import('@/pages/home/components/content/label'),
    },
    {
      path: 'allLabelStats',
      name: '所有标签统计',
      component:  () => import('@/pages/home/components/content/allLabelStats'),
    },
    {
      path: 'oneLabelStats',
      name: '某个标签统计',
      component:  () => import('@/pages/home/components/content/oneLabelStats'),
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
