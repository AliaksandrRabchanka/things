import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, filter, reduce } from 'rxjs/operators';

import { UserModel, RoutesConfig } from './../../../core';
import { MainDataFacadeService } from './../../store';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = 'http://localhost:4201';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    public router: Router,
    private http: HttpClient,
    private mainDataFacadeService: MainDataFacadeService) {}
 
  signUp(user: UserModel): Observable<any> {
    let api = `${this.endpoint}/users`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  
  signIn(user: UserModel) {
    return this.http
      .get<any>(`${this.endpoint}/users`)
      .pipe(
        map(users => {
         const validUser = users.find(el => +el.id === +user.id);
         
         if(validUser) {
          const token = {
            token: 'jwtToken',
            expiresIn: 3600,
            id: validUser.id
          }

          return token;
         }
         return {
            status: 401,
            message: "Access denied"
         };

        }),
        catchError(this.handleError))
      .subscribe((res: any) => {
        if(res.token) {
          localStorage.setItem('access_token', res.token);
          this.getUserProfile(res.id).subscribe((currentUser) => {
            this.mainDataFacadeService.updateUser(currentUser);
            this.router.navigate([RoutesConfig.main]);
          });
        }

        this.router.navigate([`${RoutesConfig.error}/${res.status}`]);
      });
  }
  
  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    this.mainDataFacadeService.updateUser(null);
    if (removeToken == null) {
      this.router.navigate([RoutesConfig.login]);
    }
  }
 
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}