export interface SitesItem {
  [key: string]: object | null | string | number | boolean;
}

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

export interface SitesState {
  sitePageDetail: SitePageDetailType;
  currentComponentId: string;
  highlightComponents?: HighlightComponentsType;
}
