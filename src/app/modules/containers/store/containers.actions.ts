import { createAction, props, Action } from '@ngrx/store';

import { ErrorModel } from '../../../core';
import { ContainerModel } from '../models';

export const getContainers = createAction(
  '[Containers] get containers',
);

export const getContainersSuccess = createAction(
  '[Containers] successfully get containers',
  props<{ containers: ContainerModel[] }>(),
);
export const getContainersFailed = createAction(
  '[Containers] getting containers failed',
  props<{ error: ErrorModel }>(),
);

export const createContainer = createAction(
  '[Containers] create container',
  props<{ container: ContainerModel }>()
);

export const createContainerSuccess = createAction(
  '[Containers] successfully create container',
  props<{ container: ContainerModel }>(),
);

export const createContainerFailed = createAction(
  '[Containers] creating container failed',
  props<{ error: ErrorModel }>(),
);

export const updateContainer = createAction(
  '[Containers] update container',
  props<{ container: ContainerModel }>()
);

export const updateContainerSuccess = createAction(
  '[Containers] successfully update container',
  props<{ container: ContainerModel }>(),
);

export const updateContainerFailed = createAction(
  '[Containers] updating container failed',
  props<{ error: ErrorModel }>(),
);

export const deleteContainer = createAction(
  '[Containers] delete container',
  props<{ container: ContainerModel }>(),
);

export const deleteContainerSuccess = createAction(
  '[Containers] successfully delete container',
  props<{ container: ContainerModel }>(),
);

export const deleteContainerFailed = createAction(
  '[Containers] deleting container failed',
  props<{ error: ErrorModel }>(),
);

export const selectContainer = createAction(
  '[Containers] select container',
  props<{ container: ContainerModel }>(),
);

export const availableToUseContainer = createAction(
  '[Containers] available to use container',
  props<{ container: ContainerModel }>(),
);

export const clearContainer = createAction(
  '[Containers] clear container',
  props<{ container: ContainerModel }>(),
);

export const setOriginalContainer = createAction(
  '[Containers] set original container',
  props<{ container: ContainerModel }>(),
);