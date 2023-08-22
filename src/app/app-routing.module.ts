import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, ErrorRoutesConfig, RoutesConfig } from './core';
import { ErrorPageComponent, LoginPageComponent, MainPageComponent } from './pages';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: RoutesConfig.main,
        },
        {
            path: RoutesConfig.login,
            pathMatch: 'full',
            component: LoginPageComponent,
        },
        {
            path: RoutesConfig.main,
            pathMatch: 'full',
            component: MainPageComponent,  canActivate: [AuthGuard]
        },
      ]
    },
    {
      path: RoutesConfig.error,
      children: [
        {
          path: ErrorRoutesConfig.serverInternalError,
          component: ErrorPageComponent,
        },
        {
          path: ErrorRoutesConfig.notEnoughPermissions,
          component: ErrorPageComponent,
        },      {
          path: ErrorRoutesConfig.notFound,
          component: ErrorPageComponent,
        },
        {
          path: ErrorRoutesConfig.accessDenied,
          component: ErrorPageComponent,
        }
      ],
    },
    {
      path: '**',
      redirectTo: `${RoutesConfig.error}/${ErrorRoutesConfig.notFound}`,
    },
  ];
  
  @NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }