import Home from '../pages/intro/index';
import Detail from '../pages/detail/index';
const Routers = [

  {
    name: `home2`,
    children: [
      { name: 'home2', element: Home, options: { headerShown: false, title: '首页' } },
      { name: 'detail', element: Detail, options: { title: '详情' } },
    ],
  },
];

export default Routers;
