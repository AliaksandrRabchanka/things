import { createFeatureSelector, createSelector, MemoizedSelector, } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';

import { ErrorModel } from '../../../core';
import { ContainerModel } from '../models';

import { ContainersState, containersKey } from './containers.state';

const selectEntities = (state: ContainersState) => state.entities;
const selectOriginalContainer = (state: ContainersState) => state.originalContainer;
const selectLoading = (state: ContainersState) => state.loading;
const selectLoaded = (state: ContainersState) => state.loaded;
const selectError = (state: ContainersState) => state.error;


export const selectContainersState: MemoizedSelector<AppState, ContainersState> = createFeatureSelector<ContainersState>(
    containersKey,
);

const selectContainersEntities: MemoizedSelector<AppState, Readonly<{[id:number]: ContainerModel}>> = createSelector(selectContainersState, selectEntities);

export const selectContainersOriginalContainer: MemoizedSelector<AppState, ContainerModel> = createSelector(
  selectContainersState,
  selectOriginalContainer
);

export const selectContainersLoading: MemoizedSelector<AppState, boolean> = createSelector(
  selectContainersState,
  selectLoading
);

export const selectContainersLoaded: MemoizedSelector<AppState, boolean> = createSelector(
  selectContainersState,
  selectLoaded
);

export const selectContainersError: MemoizedSelector<AppState, ErrorModel> = createSelector(
  selectContainersState,
  selectError
);

// transform object to array 
export const selectContainers:MemoizedSelector<AppState, ContainerModel[]> = createSelector(
  selectContainersEntities,
  entities => {
    return Object.keys(entities).map(id => entities[+id]);
  }
);