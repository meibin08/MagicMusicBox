import React, { useEffect } from 'react';
import {
  CaretRightOutlined,
  RightOutlined,
  ChromeOutlined,
} from '@ant-design/icons';
import { shallowEqual } from 'react-redux';
import { ShapeMarkComponent, PlayMarkIconComponent } from '@/components/index';
import { SkeletonsMusicIconPlaceholder } from '@/src/skeletons';
import { formatNumUnit } from '@/utils/tools';
import { clsPrefix } from '@/utils/serialization';
import {
  fetchPersonalizedList,
  fetchDiscoverBannerList,
} from '@/store/discovers';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import CarouselComponent from './carousel';
import DailySongsComponent from './dailySongs';
import './index.scss';

const prefixCls = 'app-discovers';
const clsName = clsPrefix(prefixCls);
const AppDiscoverPage = (props) => {
  const dispatch = useAppDispatch();
  const { personalizedList, discoverBannerList } = useAppSelector((state) => {
    const { discoversState: { personalizedList, discoverBannerList } = {} } =
      state;
    return { personalizedList, discoverBannerList };
  }, shallowEqual);
  useEffect(() => {
    dispatch(fetchDiscoverBannerList(0));
    dispatch(fetchPersonalizedList({ limit: 9 }));
  }, []);

  return (
    <div className={prefixCls}>
      <CarouselComponent discoverBannerList={discoverBannerList} {...props} />
      <h2 className={clsName('title')}>
        推荐歌单
        <RightOutlined className="icon" />
      </h2>
      <div className={clsName('list')}>
        <DailySongsComponent />
        {personalizedList.map((item, i) => {
          const backgroundImageStyle = {
            backgroundImage: `url(${item.picUrl}?param=270y270)`,
          };
          const playTotal = formatNumUnit(item.playCount || 0);
          const isShadow = !!item.picUrl;
          return (
            <ShapeMarkComponent
              className="row-category"
              key={`${item.id}-${i}`}
              extra={item.name}
              style={backgroundImageStyle}
              isShadow={isShadow}
            >
              {isShadow && (
                <div className="category-header">
                  <ChromeOutlined />
                  <p className="play-total">
                    <CaretRightOutlined />
                    {playTotal}
                  </p>
                </div>
              )}
            </ShapeMarkComponent>
          );
        })}
      </div>
      <h2 className={clsName('title')}>
        最新音乐
        <RightOutlined className="icon" />
      </h2>
      <div className={clsName('news-music')}>
        <div className="column-item">
          <p className="music-cover">
            <img
              src="https://p1.music.126.net/zA3f-Brv5WP5-1V4g-6t7Q==/109951164666312667.jpg?param=270y270"
              alt=""
            />
            <PlayMarkIconComponent className="play" />
          </p>
          <p className="serialnum">01</p>
          <div className="music-intro">
            <h4 className="song-title">测试歌曲</h4>
            <p className="song-author">张有财</p>
          </div>
          <SkeletonsMusicIconPlaceholder
            isShadow={true}
            style={{
              backgroundImage: `url(https://p1.music.126.net/zA3f-Brv5WP5-1V4g-6t7Q==/109951164666312667.jpg?param=270y270)`,
            }}
          />
        </div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
      </div>
    </div>
  );
};
export default AppDiscoverPage;
