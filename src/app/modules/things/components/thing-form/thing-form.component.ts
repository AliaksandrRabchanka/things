import { Component, EventEmitter, Input, type OnInit, Output } from '@angular/core';

import { MainDataFacadeService } from '../../../../core';
import { ThingModel } from '../../models/thing.model';
import { ThingsFacadeService } from '../../store';

@Component({
  selector: 'app-thing-form',
  templateUrl: './thing-form.component.html',
  styleUrls: ['./thing-form.component.scss']
})
export class ThingFormComponent implements OnInit {
  @Input() thing: ThingModel | undefined;
  @Output() closeModal = new EventEmitter();

  constructor(
    private mainDataFacadeService: MainDataFacadeService,
    private thingsFacadeService: ThingsFacadeService,
    ) {}

  ngOnInit(): void {
  }

  onSaveThing(): void {
    const thing = { ...this.thing } as ThingModel;
    if(thing.id) {
      this.thingsFacadeService.updateThing(thing);
    } else {
      this.thingsFacadeService.createThing(thing);
    }
    this.closeThingForm();
  }

  closeThingForm():void {
    this.mainDataFacadeService.updateShowModal(false);
    this.closeModal.emit();
  }
}
