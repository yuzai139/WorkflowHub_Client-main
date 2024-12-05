import { TestBed } from '@angular/core/testing';

import { TestMemberIdPublisherIdService } from './test-member-id-publisher-id.service';

describe('TestMemberIdPublisherIdService', () => {
  let service: TestMemberIdPublisherIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestMemberIdPublisherIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
