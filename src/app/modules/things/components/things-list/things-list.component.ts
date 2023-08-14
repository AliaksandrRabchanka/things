import { Component, EventEmitter, type OnInit, Input, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { CheckService, ErrorModel, MainDataFacadeService } from '../../../../core';

import { ThingModel } from '../../models/thing.model';
import { ThingsFacadeService } from '../../store';


@Component({
  selector: 'app-things-list',
  templateUrl: './things-list.component.html',
  styleUrls: ['./things-list.component.scss'],
})
export class ThingsListComponent implements OnInit {
  things$!: Observable<ThingModel[]>;
  thingsError$!: Observable<ErrorModel>;
  things!: ThingModel[];
  @Input() thing: ThingModel | undefined;
  @Output() showModal = new EventEmitter<ThingModel>();

  constructor(
    private thingsFacadeService: ThingsFacadeService,
    private checkService: CheckService,
    private mainDataFacadeService: MainDataFacadeService,
  ) {}

  ngOnInit(): void {
    this.things$ = this.thingsFacadeService.things$;
    this.thingsError$ = this.thingsFacadeService.thingsError$;
    this.thingsFacadeService.getThings();
  }

  onCreateThing(): void {
    const thing = new ThingModel();

    this.showModal.emit(thing);
    this.mainDataFacadeService.updateShowModal(true);
  }

  onEditThing(thing: ThingModel): void {
    this.showModal.emit(thing);
    this.mainDataFacadeService.updateShowModal(true);
  }

  onHideThing(thing: ThingModel): void {
    this.checkService.checkAvailableVolumes(thing);
  }

  onDeleteThing(thing: ThingModel): void {
    this.thingsFacadeService.deleteThing(thing);
  }

  onUncheckThings(): void {
    this.checkService.clearThings();
  }

  trackByFn(index: number, thing: ThingModel): number | null {    
    return thing.id;
  }
}
