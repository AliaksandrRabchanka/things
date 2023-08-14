import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ErrorModel } from '../../../core';
import { ThingModel } from '../models';

import * as ThingsSelectors from './things.selectors';
import * as ThingsActions from './things.actions';
import { AppState } from '../../../core/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class ThingsFacadeService {
  constructor(
    private store: Store<AppState>,
  ) {
  }

  getThings(): void {
    this.store.dispatch(ThingsActions.getThings());
  }

  get things$(): Observable<ThingModel[]> {
    return this.store.pipe(select(ThingsSelectors.selectThings));
  }

  getThingsError(): void {
    this.store.dispatch(ThingsActions.getThings());
  }

  get thingsError$(): Observable<ErrorModel> {
    return this.store.pipe(select(ThingsSelectors.selectThingsError));
  }

  createThing(thing: ThingModel): void {
    this.store.dispatch(ThingsActions.createThing({ thing }));
  }

  updateThing(thing: ThingModel): void {
    this.store.dispatch(ThingsActions.updateThing({ thing }));
  }

  selectThing(thing: ThingModel): void {
    this.store.dispatch(ThingsActions.selectThing({ thing }));
  }

  clearThing(thing: ThingModel): void {
    this.store.dispatch(ThingsActions.clearThing({ thing }));
  }

  deleteThing(thing): void {
    this.store.dispatch(ThingsActions.deleteThing({ thing }));
  }
}