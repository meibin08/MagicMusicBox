import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { Deserialize } from '@/src/utils/serialization';
import {
  getPersonalizedList,
  getBannerList,
  getLatestMusictList,
} from '@/api/index';
import {
  SitePageDetailType,
  DiscoverBannerType,
  LatestMusictType,
} from './type';

export const fetchPersonalizedList = createAsyncThunk(
  'discover/fetchPersonalized',
  async (options: { limit: number }, { rejectWithValue }) => {
    try {
      const { result = [] }: { result: SitePageDetailType[] } =
        (await getPersonalizedList(options)) || {};
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchDiscoverBannerList = createAsyncThunk(
  'discover/fetchDiscoverBanner',
  async (type: number, { rejectWithValue }) => {
    try {
      const { banners = [] }: { banners: DiscoverBannerType[] } =
        (await getBannerList(type)) || {};
      return banners;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchLatestMusictList = createAsyncThunk(
  'discover/fetchLatestMusict',
  async (type: number, { rejectWithValue }) => {
    try {
      const { result = [] }: { result: LatestMusictType[] } =
        (await getLatestMusictList(type)) || {};
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 对应 async thunk 的 Reducers 处理；
export default (builder) =>{
  builder.addCase(
    fetchPersonalizedList.fulfilled,
    (state, action: PayloadAction<SitePageDetailType[]>) => {
      state.personalizedList = action.payload;
    }
  );
  builder.addCase(
    fetchDiscoverBannerList.fulfilled,
    (state, action: PayloadAction<DiscoverBannerType[]>) => {
      state.discoverBannerList = action.payload;
    }
  );
  builder.addCase(
    fetchLatestMusictList.fulfilled,
    (state, action: PayloadAction<DiscoverBannerType[]>) => {
      state.latestMusictList = action.payload;
    }
  );
};
