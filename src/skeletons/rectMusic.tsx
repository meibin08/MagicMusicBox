import React from 'react';
import ContentLoader from 'react-content-loader';

const SkelectonComponent = (props) => {
  let { width = 135, height = 135 } = props;
  const svgrectH = height - 30;
  return (
    <ContentLoader
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="rgba(255,255,255,.3)"
      foregroundColor="rgba(222,222,222,.5)"
      {...props}
    >
      <rect x="0" y={svgrectH+5} rx="4" ry="4" width={width - 30} height="10" />
      <rect x="0" y={svgrectH+20} rx="3" ry="3" width={width - 60} height="10" />
      <rect x="0" y="0" rx="5" ry="5" width={width} height={svgrectH} />
    </ContentLoader>
  );
};

export default SkelectonComponent;
