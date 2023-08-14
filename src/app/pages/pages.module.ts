import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { LoginComponent, MainComponent } from '.';
import { ContainerComponent, ContainerFormComponent, ContainersListComponent } from '../modules/containers';
import { ThingComponent, ThingFormComponent, ThingsListComponent } from '../modules/things';
import { ModalComponent } from '../components';

@NgModule({
  declarations: [
    ContainerComponent,
    ContainerFormComponent,
    ContainersListComponent,
    LoginComponent,
    MainComponent,
    ModalComponent,
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