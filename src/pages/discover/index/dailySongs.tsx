import React from 'react';
import { ShapeMarkComponent } from '@/components/index';
import { CalendarOutlined } from '@ant-design/icons';

const dailySongUrl =
  'https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg?param=512y512';

const DailySongsComponent = (props) => {
  return (
    <ShapeMarkComponent
      className="daily-songs"
      extra={'每日推荐歌曲'}
      style={{
        backgroundImage: `url(${dailySongUrl}?param=270y270)`,
      }}
      isShadow={true}
    >
      <p
        className="cover"
        onClick={() => {
          window.location.href = '/test';
          console.log('test')
        }}
      >
        <img src={dailySongUrl} alt="" />
      </p>
      <p className="calendar">
        <CalendarOutlined />
        <span className="today">24</span>
      </p>
    </ShapeMarkComponent>
  );
};
export default DailySongsComponent;
