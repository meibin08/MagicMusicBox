import React, { useEffect } from 'react';
import {
  CaretRightOutlined,
  RightOutlined,
  ChromeOutlined,
} from '@ant-design/icons';
import { shallowEqual } from 'react-redux';
import { ShapeMarkComponent, PlayMarkIconComponent } from '@/components/index';
import { SkeletonsMusicIconPlaceholder } from '@/src/skeletons';
import { formatNumUnit, addZero } from '@/utils/tools';
import { clsPrefix } from '@/utils/serialization';
import {
  fetchPersonalizedList,
  fetchDiscoverBannerList,
  fetchLatestMusictList,
} from '@/store/discovers';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import CarouselComponent from './carousel';
import DailySongsComponent from './dailySongs';
import './index.scss';

const prefixCls = 'app-discovers';
const clsName = clsPrefix(prefixCls);
const AppDiscoverPage = (props) => {
  const dispatch = useAppDispatch();
  const {
    personalizedList = [],
    discoverBannerList = [],
    latestMusictList = [],
  } = useAppSelector((state) => {
    const {
      discoversState: {
        personalizedList,
        discoverBannerList,
        latestMusictList,
      } = {},
    } = state;
    return { personalizedList, discoverBannerList, latestMusictList };
  }, shallowEqual);
  useEffect(() => {
    dispatch(fetchDiscoverBannerList(0));
    dispatch(fetchPersonalizedList({ limit: 9 }));
    dispatch(fetchLatestMusictList(0));
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
        {latestMusictList.map((k, index) => {
          let { song: { artists = [] } = {} } = k;
          return (
            <div className="column-item" key={k.id}>
              <div className="music-cover">
                <img src={`${k.picUrl}?param=170y120`} alt="" />
                <PlayMarkIconComponent className="play" />
              </div>
              <p className="serialnum">{addZero(index + 1)}</p>
              <div className="music-intro">
                <h4 className="song-title">{k.name}</h4>
                <p className="song-author">
                  {artists.map((item, i) => (
                    <React.Fragment key={`${item.id}`}>
                      {i > 0 && '/'}
                      <a className="author-name">{item.name}</a>
                    </React.Fragment>
                  ))}
                </p>
              </div>
              <SkeletonsMusicIconPlaceholder
                isShadow={true}
                style={{
                  backgroundImage: `url(${k.picUrl}?param=370y80)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AppDiscoverPage;
