import React from 'react';
import { Outlet } from 'react-router-dom';
import { clsPrefix } from '@/utils/serialization';
import AppHeader from './components/header/index';
import AppSidebar from './components/sidebar/index';
import { FakeScrollComponent } from '@/src/components';
const prefixCls = 'app-container';
const clsName = clsPrefix(prefixCls);
const AppComponent = () => {
  return (
    <>
      <i className="app-vague-bg" />
      <div className={prefixCls}>
        <AppHeader />
        <section className={clsName('layout')}>
          <AppSidebar />
          <FakeScrollComponent className={clsName('outlet')}>
            <Outlet />
          </FakeScrollComponent>
        </section>
      </div>
    </>
  );
};
export default AppComponent;
