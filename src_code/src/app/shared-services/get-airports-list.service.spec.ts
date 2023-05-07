import { TestBed } from '@angular/core/testing';

import { GetAirportsListService } from './get-airports-list.service';

describe('GetAirportsListService', () => {
  let service: GetAirportsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAirportsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
