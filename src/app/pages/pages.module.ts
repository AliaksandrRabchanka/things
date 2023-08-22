import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ErrorPageComponent, LoginPageComponent, MainPageComponent } from '.';
import { ModalComponent } from '../components';
import { 
  ContainerComponent,
  ContainerFormComponent,
  ContainersListComponent,
  ThingComponent,
  ThingFormComponent,
  ThingsListComponent,
  LoginFormComponent
} from '../modules';

@NgModule({
  declarations: [
    ErrorPageComponent,
    LoginPageComponent,
    MainPageComponent,
    ModalComponent,
    ContainerComponent,
    ContainerFormComponent,
    ContainersListComponent,
    LoginFormComponent,
    ThingComponent,
    ThingFormComponent,
    ThingsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PagesModule { }