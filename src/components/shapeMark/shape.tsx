import React, { ReactNode } from 'react';
import { SkeletonsMusicIconPlaceholder } from '@/src/skeletons';
import classnames from 'classnames';
import PlayMarkIcon from '../playMark';
import { clsPrefix } from '@/utils/serialization';

const prefixCls = 'shap-component';
const clsName = clsPrefix(prefixCls);
interface ShapProps {
  style?: React.CSSProperties;
  isShadow: boolean;
  extra: ReactNode;
  className?: string;
  children: ReactNode;
}
const ShapeMarkComponent = (props: ShapProps) => {
  let {
    isShadow = false,
    style = {},
    extra = null,
    children = null,
    className = '',
  } = props;
  return (
    <section
      className={classnames(prefixCls, { [`${className}`]: !!className })}
    >
      <div className={clsName('core')} style={style}>
        <SkeletonsMusicIconPlaceholder isShadow={isShadow} style={style} />
        {isShadow && <PlayMarkIcon />}
        {children}
      </div>
      <div className={clsName('extra')}>{extra}</div>
    </section>
  );
};

export default ShapeMarkComponent;
