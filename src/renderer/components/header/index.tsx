import { clsPrefix } from '@/utils/serialization';
import { MusicIcon, CustomLink } from '@/src/components';
import {
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  SkinOutlined,
  SwapOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Badge } from 'antd';
import HeaderSearchComponent from '../search';
import HeaderCoreNavComponent from './nav';

import './index.scss';

const prefixCls = 'app-header';
const clsName = clsPrefix(prefixCls);
const AppHeaderComponent = () => {
  return (
    <div className={prefixCls}>
      <div className={clsName('history', 'col')}>
        <LeftOutlined className={clsName('icon')} />
        <RightOutlined className={clsName('icon')} />
      </div>
      <div className={clsName('nav', 'col')}>
        <HeaderCoreNavComponent />
      </div>
      <div className={clsName('extra', 'col')}>
        <HeaderSearchComponent prefixCls={prefixCls} />
        <SettingOutlined className={clsName('icon')} />
        <Badge size="small" className={clsName('badge')} count={5}>
          <MailOutlined className={clsName('icon')} />
        </Badge>
        <SkinOutlined className={clsName('icon')} />
        <SwapOutlined className={clsName('icon')} />
      </div>
    </div>
  );
};
export default AppHeaderComponent;
