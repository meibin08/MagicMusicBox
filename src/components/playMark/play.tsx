import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { clsPrefix } from '@/utils/serialization';
import classnames from 'classnames';

const prefixCls = 'playmark-component';
const clsName = clsPrefix(prefixCls);

const PlayMarkComponent = ({ className }: { className?: string }) => {
  return (
    <p className={classnames(prefixCls, { [`${className}`]: !!className })}>
      <span className={clsName('radius-bg')}>
        <CaretRightOutlined />
      </span>
    </p>
  );
};

export default PlayMarkComponent;
