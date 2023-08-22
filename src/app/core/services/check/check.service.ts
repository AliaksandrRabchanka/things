import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

import { ContainerModel, ThingModel } from '../../../modules'
import { ContainersFacadeService, ThingsFacadeService } from '../../../modules';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  //TODO: update type
  private hideElem!: any;
  private prevHideElem!: any;

  private containers$: Observable<ContainerModel[]> = this.containersFacadeService.containers$;
  private things$: Observable<ThingModel[]> = this.thingsFacadeService.things$;

  constructor(
    private containersFacadeService: ContainersFacadeService,
    private thingsFacadeService: ThingsFacadeService,
    ) {}

  checkAvailableVolumes(el: NonNullable<ContainerModel> | NonNullable<ThingModel>): void {
    if(this.prevHideElem){
      if(this.prevHideElem.type !== el.type){
        this.prevHideElem.selected = false;
      } else {
        if(this.prevHideElem.id !== el.id) {
          this.prevHideElem.selected = false;
        }
      }
      this.hideElem.selected = false;
      this.prevHideElem = this.hideElem;

    } else {
      this.prevHideElem = el;
      this.prevHideElem.selected = true;
    }

    if(this.prevHideElem.type === 'container') {
      this.containersFacadeService.selectContainer(this.prevHideElem)
    } else {
      this.thingsFacadeService.selectThing(this.prevHideElem)
    }

    this.hideElem = el;
    this.hideElem.selected = true;

    this.containers$.pipe(
      first(),
      ).subscribe(containers => {
        containers.forEach(container => {
          container.canUseToHide = false;
          if (container.type !== this.hideElem.type || container.id !== this.hideElem.id) {
            if(container.availableVolume && this.hideElem.volume && container.availableVolume > this.hideElem.volume) {
              container.canUseToHide = true;
            }
          }
          this.containersFacadeService.availableToUseContainer(container);
        });
      })
  }

  updateParentContainer(hiddenElem: ContainerModel | ThingModel, container: ContainerModel) {
    const updatedParentContainer = {...container};
    updatedParentContainer.availableVolume! -= hiddenElem.volume!;
    updatedParentContainer.canUseToHide = false;
    return updatedParentContainer;
  }

  useToHideContainer(el: NonNullable<ContainerModel>): void {
    const container = { ...el };
    if(this.hideElem && this.hideElem.id) {
      if(!container.hiddenThings) {
        container.hiddenThings = {containers: <number[]>[], things: <number[]>[]};
      }

      const field = this.hideElem.type === 'container' ? 'containers' : 'things';
      
      container.hiddenThings[field].push(this.hideElem.id);
      this.hideElem.isHidden = true;
      this.hideElem.selected = false;
      this.hideElem.parent = container.id;
      
      const parentContainer = this.updateParentContainer({...this.hideElem}, {...container})

      if(this.hideElem.type === 'container'){
        this.containersFacadeService.updateContainer({...this.hideElem});
      } else {
        this.thingsFacadeService.updateThing({...this.hideElem});
      }
      
      this.containersFacadeService.updateContainer({...parentContainer});
      this.clearResetContainers(false);
    } else {
      // TODO: check w/o selected item
      console.log('hideElem is absent...');
    }
  }

  resetContainer(el: ContainerModel): void {
    const container = { ...el};
    container.selected = false;
    container.canUseToHide = false;

    this.containersFacadeService.clearContainer(container);
  }

  clearContainer(el: ContainerModel): void {
    const container = { ...el};
    container.availableVolume = container.volume;
    container.selected = false;
    container.canUseToHide = false;
    container.isHidden = false;
    container.parent = null;
    container.hiddenThings = {
      containers: [],
      things: []
    };

    this.containersFacadeService.clearContainer(container);
    this.containersFacadeService.updateContainer(container);
  }

  clearResetContainers(clear: boolean): void {
    this.containers$.pipe(
      first(),
      ).subscribe(containers => {
        containers.forEach(container => {
          clear ? this.clearContainer(container) : this.resetContainer(container);
        })
      })
  }

  clearThing(el: ThingModel): void {
    const thing = { ...el};
    thing.isHidden = false;
    thing.parent = null;
    thing.selected = false;

    this.thingsFacadeService.clearThing(thing);
    this.thingsFacadeService.updateThing(thing);
  }

  clearThings(): void {
    this.things$.pipe(
      first(),
      ).subscribe(things => {
        things.forEach(thing => {
          this.clearThing(thing);
        })
      })
  }
}
