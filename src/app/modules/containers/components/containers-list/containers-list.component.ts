import { Component, EventEmitter, type OnInit, Input, Output } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { CheckService, ErrorModel, MainDataFacadeService } from '../../../../core';

import { HttpContainerService } from '../../api';
import { ContainerModel } from '../../models/container.model';
import { ContainersFacadeService } from '../../store';




@Component({
  selector: 'app-containers-list',
  templateUrl: './containers-list.component.html',
  styleUrls: ['./containers-list.component.scss']
})
export class ContainersListComponent implements OnInit {
  containers$!: Observable<ContainerModel[]>;
  containersError$!: Observable<ErrorModel>;
  containers!: ContainerModel[];
  @Input() container: ContainerModel | undefined;
  @Output() showModal = new EventEmitter<ContainerModel>();

  constructor(
    private checkService: CheckService,
    private mainDataFacadeService: MainDataFacadeService,
    private containersFacadeService: ContainersFacadeService
    ) {}

  ngOnInit(): void {
    this.containers$ = this.containersFacadeService.containers$;
    this.containersError$ = this.containersFacadeService.containersError$;
    this.containersFacadeService.getContainers();
  }

  onCreateContainer(): void {
    const container = new ContainerModel()
    this.showModal.emit(container);
    this.mainDataFacadeService.updateShowModal(true);
  }

  onEditContainer(container: ContainerModel): void {
    this.showModal.emit(container);
    this.mainDataFacadeService.updateShowModal(true);
  }

  onHideContainer(container: ContainerModel): void {
    this.checkService.checkAvailableVolumes(container);
  }

  onDeleteContainer(container: ContainerModel): void {
    this.containersFacadeService.deleteContainer(container);
  }

  onUncheckContainers(): void {
    this.checkService.clearResetContainers(true);
  }

  trackByFn(index: number, container: ContainerModel): number | null {    
    return container.id;
  }
}