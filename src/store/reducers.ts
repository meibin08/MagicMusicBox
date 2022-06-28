import { combineReducers } from 'redux';

import { DiscoversState } from './discovers/type';
import { SitesState } from './sites/type';
import SitesReducer from './sites/index';
import DiscoversReducer from './discovers/index';

export interface ApplicationState {
  sitesState: SitesState;
  discoversState: DiscoversState;
}

export const rootReducers = combineReducers<ApplicationState>({
  sitesState: SitesReducer,
  discoversState: DiscoversReducer,
});
