import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { clsPrefix } from '@/utils/serialization';
import { FakeScrollComponent } from '@/src/components';
import AppHeader from './components/header/index';
const prefixCls = 'app-container';
const clsName = clsPrefix(prefixCls);
export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <i className="app-vague-bg" />
      <div className={prefixCls}>
        <AppHeader />
        <section className={clsName('layout')}>{children}</section>
      </div>
    </>
  );
};
const AppComponent = () => {
  return (
    <AppLayout>
      <FakeScrollComponent className={clsName('outlet')}>
        <Outlet />
      </FakeScrollComponent>
    </AppLayout>
  );
};
export default AppComponent;
