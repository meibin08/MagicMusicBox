import React from 'react';
import { AppleOutlined } from '@ant-design/icons';
import classnames from 'classnames';

interface SkeletonsIconPlaceholderProps {
  fontSize?: number;
  alpha?: number;
  style?: React.CSSProperties;
  className?: string;
  isShadow?: boolean;
}

const SkelectonComponent = (props: SkeletonsIconPlaceholderProps) => {
  const {
    fontSize = 20,
    alpha = 0.6,
    style = {},
    className = '',
    isShadow = false,
  } = props;
  return (
    <i
      className={classnames('skeleton-placeholder-icon', {
        [`${className}`]: !!className,
        shadow: isShadow,
      })}
      style={{
        backgroundColor: `rgba(255,255,255,${alpha})`,
        fontSize,
        ...style,
      }}
    >
      <AppleOutlined />
    </i>
  );
};

export default SkelectonComponent;
