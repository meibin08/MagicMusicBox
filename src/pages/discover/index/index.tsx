import { clsPrefix } from '@/utils/serialization';
import { MusicIcon, CustomLink } from '@/src/components';
import CarouselComponent from './carousel';
import { RightOutlined } from '@ant-design/icons';
import './index.scss';

const prefixCls = 'app-discovers';
const clsName = clsPrefix(prefixCls);
const AppDiscoverPage = (props) => {
  return (
    <div className={prefixCls}>
      <CarouselComponent {...props} />
      <h2 className={clsName('title')}>
        推荐歌单
        <RightOutlined className={'icon'} />
      </h2>
      <div className={clsName('list')}>
        <section className="row-col"><p>1</p></section>
        <section className="row-col"><p>1</p></section>
        <section className="row-col"><p>1</p></section>
        <section className="row-col"><p>1</p></section>
        <section className="row-col"><p>1</p></section>
        <section className="row-col"><p>1</p></section>
        <section className="row-col"><p>1</p></section>
        <section className="row-col"><p>1</p></section>
        <section className="row-col"><p>1</p></section>
      </div>
    </div>
  );
};
export default AppDiscoverPage;
