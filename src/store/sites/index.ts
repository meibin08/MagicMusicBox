import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SitesState } from './type';

const initialState: SitesState = {
  sitePageDetail: {
    title: '',
    rootConfig: {
      id: '',
      alias: '',
      props: {
        style: {},
      },
      name: '',
    },
    path: '',
    updatedAt: '',
    rootComponentIds: [],
    uid: '',
    objectId: '',
    createdAt: '',
    isHome: false,
    blocksData: {},
    relationMap: {},
    componentMap: {},
    componentList: [],
    componentEventMap: {},
    dependent: {
      __type: '',
      className: '',
      objectId: '',
    },
    minHeight: '',
  },
  currentComponentId: 'react native',
  highlightComponents: {
    componentId: '',
    action: 'HOVER',
  },
};

export const SiteSlice = createSlice({
  name: 'sitesReducer',
  initialState,
  reducers: {
    selectedComponentId: (state, action: PayloadAction<string>) => {
      state.currentComponentId = action.payload;
    },
  },
});
const { selectedComponentId } = SiteSlice.actions;
export { selectedComponentId };
export const { actions } = SiteSlice;
export default SiteSlice.reducer;
