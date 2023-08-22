import { Output } from "@angular/core";

import { BuildVersionModel, LinkModel, UserModel } from '../../models';

export const mainDataKey = 'mainData';

export interface MainDataState {
  buildVersion: BuildVersionModel;
  links: LinkModel[];
  showModal: boolean;
  user: UserModel
}

export const mainDataInitialState: MainDataState = {
  buildVersion: null,
  links: [],
  showModal: false,
  user: null
}
