import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../';

import { BuildVersionModel, LinkModel, UserModel } from '../../models';

import { MainDataState, mainDataKey } from './main-data.state';

export const MainDataFeatureSelector: MemoizedSelector<AppState, MainDataState> = createFeatureSelector<MainDataState>(
  mainDataKey
);

export const selectBuildVersion: MemoizedSelector<AppState, BuildVersionModel> = createSelector(
  MainDataFeatureSelector,
  (state: MainDataState): BuildVersionModel => state.buildVersion,
);

export const selectLinks: MemoizedSelector<AppState, LinkModel[]> = createSelector(
  MainDataFeatureSelector,
  (state: MainDataState): LinkModel[] => state.links,
);

export const selectShowModal: MemoizedSelector<AppState, boolean> = createSelector(
  MainDataFeatureSelector,
  (state: MainDataState): boolean => state.showModal,
);

export const selectUser: MemoizedSelector<AppState, UserModel> = createSelector(
  MainDataFeatureSelector,
  (state: MainDataState): UserModel => state.user,
);

