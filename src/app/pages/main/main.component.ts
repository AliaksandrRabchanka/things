import { Component, Input, type OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as MainDataActions from '../../core';
import { ThingModel } from '../../modules/things';
import { ContainerModel } from '../../modules/containers';
import { selectShowModal } from 'src/app/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  showModal$!: Observable<boolean>;
  thing: ThingModel | undefined;
  container: ContainerModel | undefined;

  constructor (
    private store: Store,
  ){}

  ngOnInit(): void {
    this.showModal$ = this.store.select(selectShowModal);
    this.store.dispatch(MainDataActions.getShowModal());
  }
  
  onShowModal(elem: any) {
    switch (elem?.type){
      case'thing':
        this.container = undefined;
        this.thing = elem;
        break;
        case'container':
        this.thing = undefined;
        this.container = elem;
        break;
      default:
        this.container = undefined;
        this.thing = undefined;
        break;
    }
  }
}
