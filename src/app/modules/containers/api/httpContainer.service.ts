import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, type HttpResponse, type HttpErrorResponse } from '@angular/common/http';
import { type Observable, throwError, catchError, concatMap, retry, share } from 'rxjs';

import { ContainersAPI } from '../config/containers.config';
import { type ContainerModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpContainerService {

  constructor(
    private http: HttpClient,
    @Inject(ContainersAPI) private containersUrl: string
  ) { }

  getContainers(): Observable<ContainerModel[]> {
    const url = this.containersUrl;
 
    return this.http.get<ContainerModel[]>(url)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError)
      );
  }

  createContainer(container: ContainerModel): Observable<ContainerModel> {
    const url = this.containersUrl;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post<ContainerModel>(url, container, options)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError));
  }

  updateContainer(container: ContainerModel): Observable<ContainerModel> {
    
    const url = `${this.containersUrl}/${container.id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put<ContainerModel>(url, container, options)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError));
  }

  deleteContainer(container: ContainerModel): Observable<ContainerModel[]> {
    const url = `${this.containersUrl}/${container.id}`;

    return this.http.delete<ContainerModel>(url)
      .pipe(
        concatMap(() => this.getContainers()),
        retry(3),
        share(),
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
