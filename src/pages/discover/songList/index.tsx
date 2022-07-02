import React from 'react';
import { clsPrefix } from '@/utils/serialization';
import { MusicIcon, CustomLink } from '@/src/components';

import './index.scss';

const prefixCls = 'app-discover';
const clsName = clsPrefix(prefixCls);
const AppDiscover = () => {
  return <div className={prefixCls}>不是哥单吗？  歌曲清单页777</div>;
};
export default AppDiscover;
