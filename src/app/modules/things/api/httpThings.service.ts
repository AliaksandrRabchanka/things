import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, type HttpResponse, type HttpErrorResponse } from '@angular/common/http';
import { type Observable, throwError, catchError, concatMap, retry, share } from 'rxjs';

import { ThingsAPI } from '../config/things.config';
import { type ThingModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpThingsService {

  constructor(
    private http: HttpClient,
    @Inject(ThingsAPI) private thingsUrl: string
  ) { }

  getThings(): Observable<ThingModel[]> {
    const url = this.thingsUrl;
 
    return this.http.get<ThingModel[]>(url)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError)
      );
  }

  createThing(thing: ThingModel): Observable<ThingModel> {
    const url = this.thingsUrl;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post<ThingModel>(url, thing, options)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError));
  }

  updateThing(thing: ThingModel): Observable<ThingModel> {
    const url = `${this.thingsUrl}/${thing.id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.put<ThingModel>(url, thing, options)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError));
  }

  deleteThing(thing: ThingModel): Observable<ThingModel[]> {
    const url = `${this.thingsUrl}/${thing.id}`;

    return this.http.delete<ThingModel>(url)
      .pipe(
        retry(3),
        share(),
        concatMap(() => this.getThings()),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('An error occured: ', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
