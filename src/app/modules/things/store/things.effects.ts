import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { of, Observable, concatMap } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ThingModel } from '../models';
import { HttpThingsService } from '../api';

import * as ThingsActions from './things.actions';
import { AppState } from '../../../core/store/app.state';

@Injectable()
export class ThingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private httpThingsService: HttpThingsService,
  ){}

  getThings$ = createEffect(() => this.actions$.pipe(
    ofType(ThingsActions.getThings),
    switchMap(
      () => this.httpThingsService.getThings().pipe(
        map((things: ThingModel[]) => ThingsActions.getThingsSuccess({ things })),
        catchError(error => of(ThingsActions.getThingsFailed({ error }))),
      ),
    ),
  ));

  createThing$: Observable<Action> = createEffect(() => 
  this.actions$.pipe(
    ofType(ThingsActions.createThing),
    map(action => action.thing),
    concatMap((thing: ThingModel) => this.httpThingsService.createThing(thing).pipe(
        map((createdThing: ThingModel) => ThingsActions.createThingSuccess({ thing: createdThing })),
        catchError(error => of(ThingsActions.updateThingFailed({ error })))
      )
    )
  )
);

updateThing$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(ThingsActions.updateThing),
      switchMap(({thing}) => this.httpThingsService.updateThing(thing).pipe(
          map((updatedThing: ThingModel) => {
            return ThingsActions.updateThingSuccess({ thing: updatedThing })
          }),
          catchError(error => of(ThingsActions.updateThingFailed({ error })))
        )
      )
    )
  );

  deleteThing$ = createEffect(() => 
  this.actions$.pipe(
    ofType(ThingsActions.deleteThing),
    map(action => action.thing),
    concatMap((thing:ThingModel) => this.httpThingsService.deleteThing(thing).pipe(
        // Note: json-server doesn't return deleted user, so we use user
        map(() => ThingsActions.deleteThingSuccess({ thing })),
        catchError((error) => of(ThingsActions.deleteThingFailed({ error }))),
      ),
    ),
    )
  );
}