import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './core';
import { MainDataEffects } from './core/store/main-data';
import { ContainersEffects } from './modules/containers';
import { ThingsEffects } from './modules/things';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PagesModule } from './pages/pages.module';
import { NavComponent, FooterComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    EffectsModule.forRoot([
      MainDataEffects,
      ContainersEffects,
      ThingsEffects
    ]),
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: false,
        serialize: true,
      },
    ),
    PagesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
