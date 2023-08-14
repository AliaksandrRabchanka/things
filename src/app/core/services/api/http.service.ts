import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, type HttpResponse, type HttpErrorResponse } from '@angular/common/http';
import { type Observable, throwError, catchError, concatMap, retry, share, tap } from 'rxjs';

import { LinkModel, BuildVersionModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'http://localhost:4201';
  
  constructor(
    private http: HttpClient,
  ) { }

  getLinks(): Observable<LinkModel[]> {
    const url = this.baseUrl + '/links';
 
    return this.http.get<LinkModel[]>(url)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError)
      );
  }

  getBuildVersion(): Observable<BuildVersionModel> {
    const url = this.baseUrl + '/buildVersion';

    return this.http.get<BuildVersionModel>(url)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError)
      );
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
