import { TestBed } from '@angular/core/testing';

import { BasketapiService } from './basketapi.service';

describe('BasketapiService', () => {
  let service: BasketapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
