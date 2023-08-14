import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { ThingModel } from '../../modules/things';
import { ContainerModel } from '../../modules/containers';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
  
})
export class ModalComponent implements OnInit, OnChanges {
  title!: string;
  @Input() thing: ThingModel | undefined;
  @Input() container: ContainerModel | undefined;
  @Output() showModal = new EventEmitter<ThingModel | ContainerModel | undefined>();

  ngOnChanges(): void {
    this.createTitle();
  }

  ngOnInit(): void {
  }

  onCloseModal(): void {
    this.showModal.emit();
  }

  private createTitle(): void {
    if(this.thing) {
      this.title = (!this.thing?.id ? 'Create ' : 'Edit ') + this.thing?.type;
    } else {
      this.title = (!this.container?.id ? 'Create ' : 'Edit ') + this.container?.type;
    }

  }
}
