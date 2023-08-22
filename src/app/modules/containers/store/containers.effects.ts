import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { switchMap, concatMap, map, catchError } from 'rxjs/operators';

import { ContainerModel } from '../models';
import { HttpContainerService } from '../api';

import * as ContainersActions from './containers.actions';
import { AppState } from '../../../core/store/app.state';

@Injectable()
export class ContainersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private httpContainerService: HttpContainerService,
  ){}

  getContainers$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(ContainersActions.getContainers),
      switchMap(action => 
        this.httpContainerService.getContainers().pipe(
          map((containers: ContainerModel[]) => ContainersActions.getContainersSuccess({ containers })),
          catchError(error => of(ContainersActions.getContainersFailed({ error }))),
        ),
      ),
    )
  );

  createContainer$: Observable<Action> = createEffect(() => 
  this.actions$.pipe(
    ofType(ContainersActions.createContainer),
    map(action => action.container),
    concatMap((container: ContainerModel) => this.httpContainerService.createContainer(container).pipe(
        map((createdContainer: ContainerModel) => ContainersActions.createContainerSuccess({ container: createdContainer })),
        catchError(error => of(ContainersActions.updateContainerFailed({ error })))
      )
    )
  )
);

  updateContainer$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(ContainersActions.updateContainer),
      concatMap(({container}) => this.httpContainerService.updateContainer(container).pipe(
          map((updatedContainer: ContainerModel) => {
            return ContainersActions.updateContainerSuccess({ container: updatedContainer })
          }),
          catchError(error => of(ContainersActions.updateContainerFailed({ error })))
        )
      )
    )
  );

  deleteContainer$ = createEffect(() => 
  this.actions$.pipe(
    ofType(ContainersActions.deleteContainer),
    map(action => action.container), 
    concatMap((container:ContainerModel) => this.httpContainerService.deleteContainer(container).pipe(
        // Note: json-server doesn't return deleted user, so we use user
        map(() => ContainersActions.deleteContainerSuccess({ container })),
        catchError((error) => of(ContainersActions.deleteContainerFailed({ error }))),
      ),
    ),
    )
  );
}