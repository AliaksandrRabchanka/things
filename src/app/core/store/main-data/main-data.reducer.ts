import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import { BuildVersionModel, LinkModel } from '../../models';

import { MainDataState, mainDataInitialState } from './main-data.state';
import * as MainDataActions from './main-data.actions';

const reducer: ActionReducer<MainDataState> = createReducer(
  mainDataInitialState,
  on(
    MainDataActions.getBuildVersionSuccess,
    (state, { version }): MainDataState => ({
      ...state,
      buildVersion: version,
    }),
  ),
  on(
    MainDataActions.getLinksSuccess,
    (state, { links }): MainDataState => ({
      ...state,
      links,
    }),
  ),

  on(
    MainDataActions.updateShowModal,
    (state, { showModal }): MainDataState => ({
      ...state,
      showModal,
    }),
  ),
)

export function mainDataStateReducer(state: MainDataState, action: Action): MainDataState {
  return reducer(state, action);
}
