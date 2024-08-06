import { TestBed } from '@angular/core/testing';

import { StudentpageService } from './studentpage.service';

describe('StudentpageService', () => {
  let service: StudentpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
