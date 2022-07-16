import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import AppMainComponent from '../renderer/coreOutlet';
import RootComponent from '../renderer/app';
import AsyncImportLoadable from '@loadable/component';
import DiscoverRoute from '../pages/discover/route';
import { SYSTEM_CONFIG } from '@/utils/static';
import { routerSplicer } from './utils';

const App = AsyncImportLoadable(
  () => import(/* webpackPrefetch: true */ '../renderer/app')
);

const AppTest = AsyncImportLoadable(
  () => import(/* webpackPrefetch: true */ '../renderer/test')
);
const defaultHomeUrl = `${SYSTEM_CONFIG.mainUrlPrefix}/discover`; //发现页
const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootComponent  />,
    id:`a01`,
    children: [
      { index: true, element: <Navigate to={defaultHomeUrl} replace /> },
      /* 其他没有侧边栏的路由入口*/
      {
        path: 'test6',
        id:`122`,
        element: <AppTest />,
      },
    ],
  },
  {
    path: '/main',
    element: <AppMainComponent />,
    children: [...DiscoverRoute],
  },
];
export default routes;
// export default routerSplicer(routes);
