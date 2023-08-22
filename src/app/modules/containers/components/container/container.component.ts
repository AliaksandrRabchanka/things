import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';

import { type Observable, ReplaySubject } from 'rxjs';

import { ContainerModel } from '../../models/container.model';
import { CheckService, ErrorModel, MainDataFacadeService } from '../../../../core';
import { ContainersFacadeService } from '../../store';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit {
  @Input() container!: ContainerModel;
  @Output() editContainer = new EventEmitter<ContainerModel>();
  @Output() deleteContainer = new EventEmitter<ContainerModel>();
  @Output() hideContainer = new EventEmitter<ContainerModel>();

  private destroyed$: ReplaySubject<ContainerModel> = new ReplaySubject(1);

  constructor(
    private containersFacadeService: ContainersFacadeService,
    private checkService: CheckService,
    
    ){}

  ngOnInit(): void {
    if(this.container.selected || this.container.canUseToHide){
      this.container.selected = false;
      this.container.canUseToHide = false;

      if(this.container.availableVolume === null) {
        this.container.availableVolume = this.container.volume;
      }

      this.containersFacadeService.updateContainer(this.container);
    }
  }

  onEditContainer(): void {
    this.editContainer.emit(this.container);
  }

  onDeleteContainer(): void {
    this.deleteContainer.emit(this.container);
  }

  onHideContainer(): void {
    this.hideContainer.emit(this.container);
  }

  onUseToHideContainer(): void {
    this.checkService.useToHideContainer(this.container);
  }

  onClearContainer(): void {
    this.checkService.clearContainer(this.container);
  }
}
