import { clsPrefix } from '@/utils/serialization';
import { MusicIcon, CustomLink } from '@/src/components';

import './index.scss';

const prefixCls = 'app-discover';
const clsName = clsPrefix(prefixCls);
const AppDiscover = () => {
  return (
    <div className={prefixCls}>
      主播电台???
    </div>
  );
};
export default AppDiscover;
