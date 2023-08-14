import { Component, EventEmitter, Input, type OnInit, Output } from '@angular/core';


import { MainDataFacadeService } from '../../../../core';
import { ContainerModel } from '../../models/container.model';
import { ContainersFacadeService } from '../../store';

@Component({
  selector: 'app-container-form',
  templateUrl: './container-form.component.html',
  styleUrls: ['./container-form.component.scss']
})
export class ContainerFormComponent implements OnInit {
  @Input() container: ContainerModel | undefined;
  @Output() closeModal = new EventEmitter<ContainerModel | undefined>();

  constructor(
    private containersFacadeService: ContainersFacadeService,
    private mainDataFacadeService: MainDataFacadeService,
    ) {}

  ngOnInit(): void {
  }

  onSaveContainer(): void {
    const container = { ...this.container } as ContainerModel;    
    container.availableVolume = container.volume;

    if(container.id) {
      this.containersFacadeService.updateContainer(container);
    } else {
      this.containersFacadeService.createContainer(container);
    }
    this.closeContainerForm();
  }

  closeContainerForm():void {
    this.mainDataFacadeService.updateShowModal(false);
    this.closeModal.emit();
  }
}

