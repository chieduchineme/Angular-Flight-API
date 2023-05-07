import { TestBed } from '@angular/core/testing';

import { GetAirportsService } from './get-airports.service';

describe('GetAirportsService', () => {
  let service: GetAirportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAirportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
