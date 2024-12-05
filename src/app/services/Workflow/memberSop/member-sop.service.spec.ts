import { TestBed } from '@angular/core/testing';

import { MemberSopService } from './member-sop.service';

describe('MemberSopService', () => {
  let service: MemberSopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberSopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
