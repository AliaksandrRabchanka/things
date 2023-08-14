import { Component, OnInit } from '@angular/core';

import { type Observable, ReplaySubject, takeUntil } from 'rxjs';

import { LinkModel, MainDataFacadeService  } from '../../core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  links!: LinkModel[];

  private destroyed$: ReplaySubject<LinkModel[]> = new ReplaySubject(1);

  constructor(
    private mainDataFacade: MainDataFacadeService
  ) { }

  ngOnInit(): void {
    this.mainDataFacade.getLinks();
    this.mainDataFacade.links$
    .pipe(
      takeUntil(this.destroyed$)
    ).subscribe((links: LinkModel[]): void => {
      this.links = links
    })
  }
}
