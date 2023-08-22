import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorRoutesConfig, RoutesConfig } from '../../core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})

export class ErrorPageComponent implements OnInit {
  errorCode: number;
  errorMessage: string;
  errorMessageComment: string;
  errorImageURL: string;
  path: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.path = this.router.url.substr(1);
    this.setTypeError();
  }

  private setTypeError(): void {
    switch (this.path) {
      case `${RoutesConfig.error}/${ErrorRoutesConfig.serverInternalError}`:
        this.errorCode = 500;
        this.errorMessage = 'serverInternalError';
        this.errorMessageComment = 'serverInternalError';
        break;
      case `${RoutesConfig.error}/${ErrorRoutesConfig.notEnoughPermissions}`:
        this.errorCode = 403;
        this.errorMessage = 'notEnoughPermissions';
        this.errorMessageComment = 'notEnoughPermissions';
        break;
      case `${RoutesConfig.error}/${ErrorRoutesConfig.accessDenied}`:
        this.errorCode = 401;
        this.errorMessage = 'accessDenied';
        this.errorMessageComment = 'accessDenied';
        break;
      default:
        this.errorCode = 404;
        this.errorMessage = 'notFound';
        this.errorMessageComment = 'notFound';
        break;
    }
  }
} 
