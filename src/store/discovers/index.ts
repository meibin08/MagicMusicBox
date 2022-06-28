import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiscoversState, PersonalizedItemType } from './type';
import defaultBuilder, {
  fetchPersonalizedList,
  fetchDiscoverBannerList,
} from './thunk';

const placeholderList: PersonalizedItemType[] = Array.from(
  { length: 9 },
  () => ({
    alg: '',
    canDislike: true,
    copywriter: '',
    highQuality: true,
    id: 181879,
    name: '中国戏剧最高奖–“梅花奖”',
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
export { selectedComponentId, fetchPersonalizedList, fetchDiscoverBannerList };
export const { actions } = DiscoverSlice;
export default DiscoverSlice.reducer;
