import { clsPrefix } from '@/utils/serialization';
import { Avatar } from 'antd';
import { RightOutlined, HeartOutlined } from '@ant-design/icons';
import { CustomLink } from '@/src/components';
import { NavLink } from "react-router-dom";

import menuConfig, { mineMusic } from './config';

import './index.scss';

const prefixCls = 'app-sidebar';
const clsName = clsPrefix(prefixCls);
const AppSidebarComponent = () => {
  return (
    <div className={prefixCls}>
      <section className={clsName('user')}>
        <Avatar className="avatar" size={40}>
          M
        </Avatar>
        <p className="name">
          user <RightOutlined className="arrow" />
        </p>
      </section>
      <ul className={clsName('list')}>
        {menuConfig.map((k) => {
          const ItemIcon = k.icon;
          return (
            <li className="menu-row" key={k.uid}>
              <NavLink className="nav-link" to={k.url}>
                {ItemIcon && <ItemIcon />}
                {k.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <h3 className={clsName('title')}>我的音乐</h3>
      <ul className={clsName('list')}>
        {mineMusic.map((k) => {
          const ItemIcon = k.icon;
          return (
            <li className="menu-row" key={k.uid}>
              <CustomLink className="nav-link" to={k.url}>
                {ItemIcon && <ItemIcon />}
                {k.title}
              </CustomLink>
            </li>
          );
        })}
      </ul>
      <h3 className={clsName('title')}>创建的歌单</h3>
      <ul className={clsName('list')}>
        <li className="menu-row">
          <CustomLink className="nav-link" to={'/'}>
            <HeartOutlined />
            我喜欢的音乐
          </CustomLink>
        </li>
      </ul>
      <h3 className={clsName('title')}>收藏的歌单</h3>
      <ul className={clsName('list')}>
        <li className="menu-row">
          <CustomLink className="nav-link" to={'/'}>
            <HeartOutlined />
            劲爆DJ中文曲
          </CustomLink>
        </li>
      </ul>
    </div>
  );
};
export default AppSidebarComponent;
