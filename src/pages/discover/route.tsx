import React from 'react';
// import  { Outlet } from 'react-router-dom';
import AsyncImportLoadable from '@loadable/component';

import { uuid } from '@/utils/tools';

const AppDiscoverHome = AsyncImportLoadable(()=>
  import(/* webpackPrefetch: true */ './index')
);
const AppDiscoverSongList = AsyncImportLoadable(()=>
  import(/* webpackPrefetch: true */ './songList')
);
const AppDiscoverAnchorRadio = AsyncImportLoadable(()=>
  import(/* webpackPrefetch: true */ './anchorRadio')
);

const AppDiscoverLeaderboard = AsyncImportLoadable(()=>
  import(/* webpackPrefetch: true */ './leaderboard')
);
const AppDiscoverSinger = AsyncImportLoadable(()=>
  import(/* webpackPrefetch: true */ './singer')
);

const AppDiscoverNewMusic = AsyncImportLoadable(()=>
  import(/* webpackPrefetch: true */ './latestMusic')
);

const route = [
  {
    path: 'discover', // 个性推荐
    // element: <Outlet />,
    children: [
      {
        index: true,
        element: <AppDiscoverHome />,
        title: '个性推荐',
        // path: 'discover',
      },
      {
        title: '歌单',
        path: 'song-list',
        element: <AppDiscoverSongList />,
      },
      {
        title: '主播电台',
        path: 'anchor-radio',
        element: <AppDiscoverAnchorRadio />,
      },
      {
        title: '排行榜',
        path: 'leaderboard',
        element: <AppDiscoverLeaderboard />,
      },
      {
        title: '歌手',
        path: 'singer',
        element: <AppDiscoverSinger />,
      },
      {
        title: '最新音乐',
        path: 'latest-music',
        element: <AppDiscoverNewMusic />,
      },
    ],
  },
];
export const discoverHeaderNav: { [key: string]: string }[] =
  route[0].children.map((k) => ({
    title: k.title,
    path: `/main/${k.path}`,
    uid: uuid(),
  }));
export default route;
