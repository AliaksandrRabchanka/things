import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ErrorModel } from '../../../core';
import { ContainerModel } from '../models';

import * as ContainersSelectors from './containers.selectors';
import * as ContainersActions from './containers.actions';
import { AppState } from '../../../core/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class ContainersFacadeService {
  constructor(
    private store: Store<AppState>,
  ) {
  }

  getContainers(): void {
    this.store.dispatch(ContainersActions.getContainers());
  }

  get containers$(): Observable<ContainerModel[]> {
    return this.store.pipe(select(ContainersSelectors.selectContainers));
  }

  getContainersError(): void {
    this.store.dispatch(ContainersActions.getContainers());
  }

  get containersError$(): Observable<ErrorModel> {
    return this.store.pipe(select(ContainersSelectors.selectContainersError));
  }

  createContainer(container: ContainerModel): void {
    this.store.dispatch(ContainersActions.createContainer({ container }));
  }

  updateContainer(container: ContainerModel): void {
    this.store.dispatch(ContainersActions.updateContainer({ container }));
  }

  selectContainer(container: ContainerModel): void {
    this.store.dispatch(ContainersActions.selectContainer({ container }));
  }

  availableToUseContainer(container: ContainerModel): void {
    this.store.dispatch(ContainersActions.availableToUseContainer({ container }));
  }
  
  clearContainer(container: ContainerModel): void {
    this.store.dispatch(ContainersActions.clearContainer({ container }));
  }

  deleteContainer(container): void {
    this.store.dispatch(ContainersActions.deleteContainer({ container }));
  }

}