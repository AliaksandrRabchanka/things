import { TestBed } from '@angular/core/testing';

import { HttpThingsService } from './httpThings.service';

describe('HttpThingsService', () => {
  let service: HttpThingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpThingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
