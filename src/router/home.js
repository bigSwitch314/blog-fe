export default {
  path: '/home/index',
  name: '默认首页',
  component: () => import('@/pages/home/index'),
  children: [
    {
      path: '',
      name: '首页',
      component: import('@/pages/home/index'),
    }
  ]
};
