import React from 'react';
import { Outlet } from 'react-router-dom';
import { clsPrefix } from '@/utils/serialization';
import AppSidebar from './components/sidebar/index';
import { FakeScrollComponent } from '@/src/components';
import AsyncImportLoadable from '@loadable/component';
import { AppLayout } from './app';
const AppSongBarPage = AsyncImportLoadable(
  () => import(/* webpackPrefetch: true */ '@/src/pages/songs')
);
const prefixCls = 'app-container';
const clsName = clsPrefix(prefixCls);
const AppComponent = () => {
  return (
    <AppLayout>
      <AppSidebar />
      <FakeScrollComponent className={clsName('outlet')}>
        <Outlet />
      </FakeScrollComponent>
      <AppSongBarPage />
    </AppLayout>
  );
};
export default AppComponent;
