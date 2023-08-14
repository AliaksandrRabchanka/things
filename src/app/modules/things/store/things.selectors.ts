import { createFeatureSelector, createSelector, MemoizedSelector, } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';

import { ErrorModel } from '../../../core';
import { ThingModel } from '../models';

import { ThingsState, thingsKey } from './things.state';

const selectEntities = (state: ThingsState) => state.entities;
const selectLoading = (state: ThingsState) => state.loading;
const selectLoaded = (state: ThingsState) => state.loaded;
const selectError = (state: ThingsState) => state.error;

export const selectThingsState: MemoizedSelector<AppState, ThingsState> = createFeatureSelector<ThingsState>(
  thingsKey,
);

const selectThingsEntities: MemoizedSelector<AppState, Readonly<{[id:number]: ThingModel}>> = createSelector(selectThingsState, selectEntities);

export const selectThingsLoading: MemoizedSelector<AppState, boolean> = createSelector(
  selectThingsState,
  selectLoading
);

export const selectThingsLoaded: MemoizedSelector<AppState, boolean> = createSelector(
  selectThingsState,
  selectLoaded
);

export const selectThingsError: MemoizedSelector<AppState, ErrorModel> = createSelector(
  selectThingsState,
  selectError
);

// transform object to array 
export const selectThings:MemoizedSelector<AppState, ThingModel[]> = createSelector(
  selectThingsEntities,
  entities => {
    return Object.keys(entities).map(id => entities[+id]);
  }
);
