import { createAction, props, Action } from '@ngrx/store';

import { ErrorModel } from '../../../core';
import { ThingModel } from '../models';

export const getThings = createAction(
  '[Things] get things',
);

export const getThingsSuccess = createAction(
  '[Things] successfully get things',
  props<{ things: ThingModel[] }>(),
);

export const getThingsFailed = createAction(
  '[Things] getting things failed',
  props<{ error: ErrorModel }>(),
);

export const createThing = createAction(
  '[Things] create thing',
  props<{ thing: ThingModel }>()
);

export const createThingSuccess = createAction(
  '[Things] successfully create thing',
  props<{ thing: ThingModel }>(),
);

export const createThingFailed = createAction(
  '[Things] creating thing failed',
  props<{ error: ErrorModel }>(),
);

export const updateThing = createAction(
  '[Things] update thing',
  props<{ thing: ThingModel }>()
);

export const updateThingSuccess = createAction(
  '[Things] successfully update thing',
  props<{ thing: ThingModel }>(),
);

export const updateThingFailed = createAction(
  '[Things] updating thing failed',
  props<{ error: ErrorModel }>(),
);

export const deleteThing = createAction(
  '[Things] delete thing',
  props<{ thing: ThingModel }>(),
);

export const deleteThingSuccess = createAction(
  '[Things] successfully delete thing',
  props<{ thing: ThingModel }>(),
);

export const deleteThingFailed = createAction(
  '[Things] deleting thing failed',
  props<{ error: ErrorModel }>(),
);

export const selectThing = createAction(
  '[Things] select things',
  props<{ thing: ThingModel }>(),
);

export const clearThing = createAction(
  '[Things] available to use things',
  props<{ thing: ThingModel }>(),
);