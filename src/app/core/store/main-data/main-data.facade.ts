import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BuildVersionModel, LinkModel, UserModel } from '../../models';

import * as MainDataSelectors from './main-data.selectors';
import * as MainDataActions from './main-data.actions';
import { AppState } from '../';

@Injectable({
  providedIn: 'root',
})
export class MainDataFacadeService {
  constructor(private store: Store<AppState>) {}

  getBuildVersion(): void {
    this.store.dispatch(MainDataActions.getBuildVersion());
  }

  get buildVersion$(): Observable<BuildVersionModel> {
    return this.store.pipe(select(MainDataSelectors.selectBuildVersion));
  }

  getLinks(): void {
    this.store.dispatch(MainDataActions.getLinks());
  }

  get links$(): Observable<LinkModel[]> {
    return this.store.pipe(select(MainDataSelectors.selectLinks));
  }

  updateShowModal(showModal: boolean): void {
    this.store.dispatch(MainDataActions.updateShowModal({ showModal }));
  }

  getUser(): void {
    this.store.dispatch(MainDataActions.getUser());
  }

  get user$(): Observable<UserModel> {
    return this.store.pipe(select(MainDataSelectors.selectUser));
  }

  updateUser(user: UserModel | null): void {
    this.store.dispatch(MainDataActions.updateUser({ user }));
  }
}
