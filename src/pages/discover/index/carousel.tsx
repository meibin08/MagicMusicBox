import { clsPrefix } from '@/utils/serialization';

const prefixCls = 'carousel-component';
const clsName = clsPrefix(prefixCls);
const CarouselComponent = (props) => {
  return <section className={prefixCls}>轮播图</section>;
};
export default CarouselComponent;
