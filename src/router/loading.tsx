import React from 'react';
import Loadable from 'react-loadable';

const AsyncImportLoadable = (loadComponent: object) => {
  return Loadable({
    // loader: () => component.then((module) => module.default),
    loader: () =>
      typeof loadComponent === 'function' ? loadComponent() : loadComponent,
    loading() {
      return '加载中…';
    },
  });
};

export default AsyncImportLoadable;
