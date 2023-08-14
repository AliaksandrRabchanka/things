import { Output } from "@angular/core";

import { BuildVersionModel, LinkModel } from '../../models';

export const mainDataKey = 'mainData';

export interface MainDataState {
  buildVersion: BuildVersionModel;
  links: LinkModel[];
  showModal: boolean;
}

export const mainDataInitialState: MainDataState = {
  buildVersion: null,
  links: [],
  showModal: false
}
