import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiscoversState, PersonalizedItemType, LatestMusictType } from './type';
import defaultBuilder, {
  fetchPersonalizedList,
  fetchDiscoverBannerList,
  fetchLatestMusictList,
} from './thunk';

const placeholderList: PersonalizedItemType[] = Array.from(
  { length: 9 },
  () => ({
    alg: '',
    canDislike: true,
    copywriter: '',
    highQuality: true,
    id: 181879,
    name: ' ',
    picUrl: '',
    playCount: 181879,
    trackCount: 60,
    trackNumberUpdateTime: 1635308907906,
    type: 0,
  })
);

const initialState: DiscoversState = {
  personalizedList: placeholderList,
  discoverBannerList: [],
  latestMusictList: [],
};

export const DiscoverSlice = createSlice({
  name: 'discoversReducer',
  initialState,
  reducers: {
    selectedComponentId: (state, action: PayloadAction<string>) => {},
  },
  extraReducers: (builder) => {
    defaultBuilder(builder);
  },
});
const { selectedComponentId } = DiscoverSlice.actions;
export {
  selectedComponentId,
  fetchPersonalizedList,
  fetchDiscoverBannerList,
  fetchLatestMusictList,
};
export const { actions } = DiscoverSlice;
export default DiscoverSlice.reducer;
