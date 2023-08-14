import { TestBed } from '@angular/core/testing';

import { HttpContainerService } from './httpContainer.service';

describe('HttpContainerService', () => {
  let service: HttpContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
