import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Badge } from 'antd';
import { clsPrefix } from '@/utils/serialization';

import './index.scss';

interface Props {
  prefixCls: string;
}
const AppHeaderComponent = ({ prefixCls }: Props) => {
  const clsName = clsPrefix(prefixCls);
  return (
    <>
      <Input
        className={clsName('search-input')}
        placeholder="搜索"
        size="small"
        prefix={<SearchOutlined />}
      />
    </>
  );
};

export default AppHeaderComponent;
