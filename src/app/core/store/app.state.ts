import { ActionReducerMap, Action } from '@ngrx/store';

import { mainDataKey, MainDataState, mainDataStateReducer } from './main-data';
import { 
  containersKey,
  ContainersState,
  containersStateReducer,
  thingsKey,
  ThingsState,
  thingsStateReducer
} from '../../modules';

export interface AppState {
  [mainDataKey]: MainDataState;
  [containersKey]: ContainersState;
  [thingsKey]: ThingsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [mainDataKey]: mainDataStateReducer,
  [containersKey]: containersStateReducer,
  [thingsKey]: thingsStateReducer
}