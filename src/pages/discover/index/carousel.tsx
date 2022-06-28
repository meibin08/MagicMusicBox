import React from 'react';
import { Carousel } from 'antd';
import { clsPrefix } from '@/utils/serialization';

const prefixCls = 'carousel-component';
const clsName = clsPrefix(prefixCls);
const CarouselComponent = (props) => {
  let { discoverBannerList = [] } = props;
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <section className={prefixCls}>
      <div className={clsName('body')}>
        <Carousel afterChange={onChange}>
          {discoverBannerList.map((k) => {
            return (
              <div key={k.encodeId} className={clsName('item')}>
                <img src={k.imageUrl} alt="" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
};
export default CarouselComponent;
