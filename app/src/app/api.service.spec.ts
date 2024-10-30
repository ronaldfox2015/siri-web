import { TestBed } from '@angular/core/testing';

import { Applicant2Service } from './service/applicant2.service';

describe('ApiService', () => {
  let service: Applicant2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Applicant2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
