import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const MusicIcon = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_3339576_z8ndy7cr3s.js',
  extraCommonProps: {
    'custom-label': 'music',
  },
});
interface IconBaseProps {
  rotate: number;
  spin: boolean;
  style: React.CSSProperties;
  type: string;
}
export default (props: IconBaseProps) => {
  const { type, ...other } = props;
  return <MusicIcon type={`icon-${type}`} {...other} />;
};
