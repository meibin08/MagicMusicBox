// import type { RouteObject } from 'react-router-dom';
import AsyncImportLoadable from '@/src/router/loading';
import { uuid } from '@/utils/tools';

const AppDiscoverHome = AsyncImportLoadable(
  import(/* webpackPrefetch: true */ './index')
);
const AppDiscoverSongList = AsyncImportLoadable(
  import(/* webpackPrefetch: true */ './songList')
);
const AppDiscoverAnchorRadio = AsyncImportLoadable(
  import(/* webpackPrefetch: true */ './anchorRadio')
);

const AppDiscoverLeaderboard = AsyncImportLoadable(
  import(/* webpackPrefetch: true */ './leaderboard')
);
const AppDiscoverSinger = AsyncImportLoadable(
  import(/* webpackPrefetch: true */ './singer')
);

const AppDiscoverNewMusic = AsyncImportLoadable(
  import(/* webpackPrefetch: true */ './latestMusic')
);

const route = [
  {
    path: '/discover', //个性推荐
    children: [
      {
        index: true,
        element: <AppDiscoverHome />,
        title: '个性推荐',
        path: '/discover',
      },
      {
        title: '歌单',
        path: '/discover/song-list',
        element: <AppDiscoverAnchorRadio />,
      },
      {
        title: '主播电台',
        path: '/discover/anchor-radio',
        element: <AppDiscoverSongList />,
      },
      {
        title: '排行榜',
        path: '/discover/leaderboard',
        element: <AppDiscoverLeaderboard />,
      },
      {
        title: '歌手',
        path: '/discover/singer',
        element: <AppDiscoverSinger />,
      },
      {
        title: '最新音乐',
        path: '/discover/latest-music',
        element: <AppDiscoverNewMusic />,
      },
    ],
  },
];
export const discoverHeaderNav: { [key: string]: string }[] =
  route[0].children.map((k) => ({
    title: k.title,
    path: k.path,
    uid: uuid(),
  }));
export default route;
