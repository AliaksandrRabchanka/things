import { createAction, props, Action } from '@ngrx/store';

import { BuildVersionModel, LinkModel, UserModel } from '../../models';

export const getBuildVersion = createAction(
  '[Main Data] getting build version',
);

export const getBuildVersionSuccess = createAction(
  '[Main Data] Successfully get build version',
  props<{ version: BuildVersionModel }>(),
);

export const getBuildVersionFailed = createAction(
  '[Main Data] getting build version failed',
  props<{ message: string }>(),
);

export const getLinks = createAction(
  '[Main Data] get links',
);

export const getLinksSuccess = createAction(
  '[Main Data] successfully get links',
  props<{ links: LinkModel[] }>(),
);

export const getLinksFailed = createAction(
  '[Main Data] getting links failed',
  props<{ message: string }>(),
);

export const getShowModal = createAction(
  '[Main Data] get modal flag',
);

export const updateShowModal = createAction(
  '[Main Data] update modal flag',
  props<{ showModal: boolean }>(),
);

export const getUser = createAction(
  '[Main Data] get user',
);

export const getUserSuccess = createAction(
  '[Main Data] successfully get user',
  props<{ user: UserModel }>(),
);

export const getUserFailed = createAction(
  '[Main Data] getting user failed',
  props<{ message: string }>(),
);

export const updateUser = createAction(
  '[Main Data] update user',
  props<{ user: UserModel | null }>(),
);