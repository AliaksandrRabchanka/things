import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, MainComponent } from './pages';

const RoutesConfig = {
    main: 'main',
    login: 'login'
  };

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: RoutesConfig.main,
    },
    {
        path: RoutesConfig.login,
        pathMatch: 'full',
        component: LoginComponent,
    },
    {
        path: RoutesConfig.main,
        pathMatch: 'full',
        component: MainComponent,
    },
    {
      path: '**',
      redirectTo: `${RoutesConfig.main}`,
    },
  ];
  
  @NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }