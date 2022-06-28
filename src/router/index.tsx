import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import RootComponent from '../renderer/App';
import AsyncImportLoadable from './loading';
import DiscoverRoute from '../pages/discover/route';
const App = AsyncImportLoadable(
  import(/* webpackPrefetch: true */ '../renderer/App')
);

const AppTest = AsyncImportLoadable(
  import(/* webpackPrefetch: true */ '../renderer/test')
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootComponent />,
    children: [
      ...DiscoverRoute,
      { index: true, element: <Navigate to="/discover" replace /> },
      {
        path: '/test6',
        element: <AppTest />,
      },
    ],
  },
];
export default () => useRoutes(routes);
