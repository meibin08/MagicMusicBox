/* 对应 src/pages/discover 下的接口 */
import { fetchJson } from '@/utils/fetch';
/* 推荐歌单 */
export const getPersonalizedList = (options) => {
  return fetchJson({
    url: '/personalized',
    type: 'GET',
    data: options,
  });
};
/* 首页banner */
export const getDateRecommend = () => {
  return fetchJson({
    url: `/recommend/songs`,
    type: 'GET',
  });
};
async function test() {
  const result = await getDateRecommend();
  console.log('test', result);
}
test();
/* 每日推荐 */
export const getBannerList = (type = 0) => {
  return fetchJson({
    url: `/banner?type=${type}`,
    type: 'GET',
  });
};

/* 最新音乐*/
export const getLatestMusictList = (type = 0) => {
  return fetchJson({
    // url: `/album/newest?type=${type}`,
    // url: `/top/song?type=${type}`,
    url: `/personalized/newsong`,
    type: 'GET',
  });
};
/* 歌单 - 歌单分类  */
export const getPlaylistCatlist = () => {
  return fetchJson({
    url: '/playlist/catlist',
    type: 'GET',
  });
};

/* 歌单 - 热门歌单分类  */
export const getPlaylistHotCategory = () => {
  return fetchJson({
    // url: '/personalized',
    url: '/playlist/hot',
    type: 'GET',
  });
};
