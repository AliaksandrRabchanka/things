import { Output } from "@angular/core";

import { ErrorModel } from '../../../core';
import { ContainerModel } from '../models';

export const containersKey = 'containers';

export interface ContainersState {
  entities: Readonly<{ [id: number]: ContainerModel }>;
  originalContainer: Readonly<ContainerModel> | null;
  selectedContainer: Readonly<ContainerModel> | null;
  loading: boolean;
  loaded: boolean;
  error: ErrorModel;
}

export const containersInitialState: ContainersState = {
  entities: {},
  originalContainer: null,
  selectedContainer: null,
  loading: false,
  loaded: false,
  error: null
}