export interface CommonItem {
  [key: string]: object | null | string | number | boolean;
}

/* 推荐歌单 */
export interface PersonalizedItemType {
  alg: string;
  canDislike: boolean;
  copywriter?: string;
  highQuality: boolean;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  type: number | boolean;
}

/* banner*/
export type DiscoverBannerType = {
  encodeId: string;
  exclusive: boolean;
  imageUrl: string;
  scm: string;
  typeTitle: string;
  song: null;
  targetId: number;
  titleColor: string;
} & CommonItem;

/* 最新音乐*/
type ArtistsItem = {
  name: string;
} & CommonItem;
export type LatestMusictType = {
  alg: string;
  canDislike: boolean;
  id: string;
  name: string;
  picUrl: string;
  song: { artists: ArtistsItem[] } & CommonItem;
  trackNumberUpdateTime: number;
  type: number;
} & CommonItem;

export interface ComponentMapType {
  [key: string]: {
    id: string;
    alias: string;
    props: {
      text?: string;
      style?: StyleType;
      extra?: StyleType;
      eventIds?: string[];
    };
    type: string;
  };
}
export interface StyleType {
  [key: string]: string | number | boolean | object;
}
export interface RootConfigType {
  id: string;
  props: {
    style: StyleType;
    extra?: StyleType;
  };
  name: string;
  alias?: string;
}

export interface EventMapType {
  [key: string]: {
    id: string;
    componentId: string;
    alias?: string;
    type: string;
    actionType: string;
    target: string;
  };
}

export interface HighlightComponentsType {
  componentId: string;
  action: 'ECHOLAYER' | 'HOVER';
}

export interface SitePageDetailType {
  path: string;
  updatedAt: string;
  rootComponentIds: string[];
  uid: string;
  objectId: string;
  createdAt?: string;
  isHome: boolean;
  blocksData: {};
  relationMap: {};
  title: string;
  rootConfig: RootConfigType;
  componentMap: ComponentMapType;
  componentList: string[];
  componentEventMap: EventMapType;
  dependent: {
    __type: string;
    className: string;
    objectId: string;
  };
  minHeight?: string;
}

export interface DiscoversState {
  personalizedList: PersonalizedItemType[]; // 推荐歌单列表
  discoverBannerList: DiscoverBannerType[];
  latestMusictList: LatestMusictType[]; //最新音乐
}
