import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

import { BuildVersionModel, LinkModel,  } from '../../models';
import { HttpService  } from '../../services';

import * as MainDataActions from './main-data.actions';
import { AppState } from '../';

@Injectable()
export class MainDataEffects {
  getBuildVersion$ = createEffect(() => this.actions$.pipe(
    ofType(MainDataActions.getBuildVersion),
    exhaustMap(
      () => this.httpService.getBuildVersion().pipe(
        map((version: BuildVersionModel) => MainDataActions.getBuildVersionSuccess({ version })),
        catchError((error: HttpErrorResponse) => of(MainDataActions.getBuildVersionFailed(
          { message: error.message }
        )))
      ),
    ),
  ));

  getLinks$ = createEffect(() => this.actions$.pipe(
    ofType(MainDataActions.getLinks),
    exhaustMap(
      () => this.httpService.getLinks().pipe(
        map((links: LinkModel[]) => MainDataActions.getLinksSuccess({ links })),
        catchError((error: HttpErrorResponse) => of(MainDataActions.getLinksFailed(
          { message: error.message }
        )))
      ),
    ),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private httpService: HttpService,
    ){}
}
