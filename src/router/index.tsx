import React from 'react';
import { Routes, Route } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import AppMainComponent from '../renderer/coreOutlet';
import RootComponent from '../renderer/app';
import AsyncImportLoadable from '@loadable/component';
import DiscoverRoute from '../pages/discover/route';
import { SYSTEM_CONFIG } from '@/utils/static';
import { routerSplicer } from './utils';
import routerConfig from './routes';

const App = AsyncImportLoadable(
  () => import(/* webpackPrefetch: true */ '../renderer/app')
);

const AppTest = AsyncImportLoadable(
  () => import(/* webpackPrefetch: true */ '../renderer/test')
);
const AppDiscoverHome = AsyncImportLoadable(
  () => import(/* webpackPrefetch: true */ '../pages/discover/index')
);

function routeRender(children) {
  if (!children) {
    return null;
  }
  return children.map((k) => {
    return (
      <Route
        key={`${k.id}`}
        index={k.index || false}
        path={k.path || ''}
        element={k.element}
      >
        {routeRender(k.children)}
      </Route>
    );
  });
}

export default () => {
  const result = (
    <div>
      <Routes>
        {routerConfig.map((k, i) => {
          return (
            <Route
              key={`${k.id}`}
              path={k.path || ''}
              element={k.element}
            >
              {routeRender(k.children)}
            </Route>
          );
        })}
      </Routes>
    </div>
  );
  console.log(result);
  return result;
};
// export default () => useRoutes(routerConfig);
