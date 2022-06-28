import React, { ReactNode } from 'react';
import { clsPrefix } from '@/utils/serialization';
import classnames from 'classnames';

const prefixCls = 'fakescroll-component';
const clsName = clsPrefix(prefixCls);

const FakeStickyComponent = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={classnames(prefixCls, { [`${className}`]: !!className })}>
      <i className={clsName('sticky')} />
      {children}
    </div>
  );
};

export default FakeStickyComponent;
