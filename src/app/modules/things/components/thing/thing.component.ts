import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { type Observable, ReplaySubject } from 'rxjs';

import { ThingModel } from '../../models/thing.model';
import { CheckService, ErrorModel, MainDataFacadeService } from '../../../../core';
import { ThingsFacadeService } from '../../store';

@Component({
  selector: 'app-thing',
  templateUrl: './thing.component.html',
  styleUrls: ['./thing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThingComponent implements OnInit{
  @Input() thing!: ThingModel;
  @Output() editThing = new EventEmitter<ThingModel>();
  @Output() deleteThing = new EventEmitter<ThingModel>();
  @Output() hideContainer = new EventEmitter<ThingModel>();

  constructor(
    private thingsFacadeService: ThingsFacadeService,
    private checkService: CheckService,
  ){}

  ngOnInit(): void {
    if(this.thing.selected) {
      this.thing.selected = false;
      this.thingsFacadeService.updateThing(this.thing);
    }
  }

  onEditThing(): void {
    this.editThing.emit(this.thing);
  }

  onDeleteThing(): void {
    this.deleteThing.emit(this.thing);
  }

  onHideThing(): void {
    this.hideContainer.emit(this.thing);
  }

  onClearThing(): void {
    this.checkService.clearThing(this.thing, true);
  }
}
