import type { RouteObject } from 'react-router-dom';
import { uuid } from '@/utils/tools';
function splicer(path: string) {
  let args = path;
  function temp(url?: string) {
    if (arguments[0]) {
      args += `/${arguments[0]}`;
      return temp;
    }
    return args;
  }
  temp.valueOf = function () {
    return args;
  };
  temp.toString = function () {
    return `${args}`;
  };
  return temp;
}

export function routerSplicer(routes: RouteObject[], path = ''): RouteObject[] {
  const res: RouteObject[] = [];
  return routes.reduce((result: RouteObject[], route: RouteObject) => {
    const { children = [] } = route;
    let nextRoute = { ...route, uid: uuid() };
    if (path && nextRoute.path) {
      // nextRoute.path = `${/^\/$/i.test(path) ? '' : path}/${nextRoute.path}`;
      nextRoute.path = `${path}/${nextRoute.path}`.replace(/\/\//g, '/');
    }
    if (children.length) {
      nextRoute.children = routerSplicer(children, nextRoute.path);
    }
    result = result.concat(nextRoute);
    return result;
  }, res);
}
