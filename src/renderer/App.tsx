import { Outlet } from 'react-router-dom';
import { clsPrefix } from '@/utils/serialization';
import AppHeader from './components/header/index';
import AppSidebar from './components/sidebar/index';

const prefixCls = 'app-container';
const clsName = clsPrefix(prefixCls);
const AppComponent = () => {
  return (
    <>
      <i className="app-vague-bg"></i>
      <div className={prefixCls}>
        <AppHeader />
        <section className={clsName('layout')}>
          <AppSidebar />
          <div className={clsName('outlet')}>
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};
export default AppComponent;
