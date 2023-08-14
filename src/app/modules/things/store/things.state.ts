import { Output } from "@angular/core";

import { ErrorModel } from '../../../core';
import { ThingModel } from '../models';

export const thingsKey = 'things';

export interface ThingsState {
  entities: Readonly<{ [id: number]: ThingModel }>;
  selectedThing: Readonly<ThingModel> | null;
  loading: boolean;
  loaded: boolean;
  error: ErrorModel;
}

export const thingsInitialState: ThingsState = {
  entities: {},
  selectedThing: null,
  loading: false,
  loaded: false,
  error: null
}