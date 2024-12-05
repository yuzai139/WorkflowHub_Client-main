import { TestBed } from '@angular/core/testing';

import { PublisherSopService } from './publisher-sop.service';

describe('PublisherSopService', () => {
  let service: PublisherSopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherSopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
