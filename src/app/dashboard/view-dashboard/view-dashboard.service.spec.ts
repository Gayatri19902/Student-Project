import { TestBed } from '@angular/core/testing';

import { ViewDashboardService } from './view-dashboard.service';

describe('ViewDashboardService', () => {
  let service: ViewDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
