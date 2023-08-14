import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BuildVersionModel } from '../../core/models';
import { MainDataFacadeService } from '../../core/store/main-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  buildVersionInfo$!: Observable<string>;

  constructor(private mainDataFacade: MainDataFacadeService) { }

  ngOnInit(): void {
    this.mainDataFacade.getBuildVersion();
    this.buildVersionInfo$ = this.mainDataFacade.buildVersion$
    .pipe(
      map((buildVersionInfo: BuildVersionModel): string => this.getBuildVersionInfo(buildVersionInfo))
    );
  }

  getBuildVersionInfo(buildVersionInfo: BuildVersionModel): string {
    return buildVersionInfo?.version || '';
  }
}