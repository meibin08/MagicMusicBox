import { combineReducers } from 'redux';

import { SitesState } from './sites/type';
import SitesReducer from './sites/index';

export interface ApplicationState {
  sitesState: SitesState;
}

export const rootReducers = combineReducers<ApplicationState>({
  sitesState: SitesReducer,
});
