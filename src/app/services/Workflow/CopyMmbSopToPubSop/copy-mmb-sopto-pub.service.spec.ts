import { TestBed } from '@angular/core/testing';

import { CopyMmbSoptoPubService } from './copy-mmb-sopto-pub.service';

describe('CopyMmbSoptoPubService', () => {
  let service: CopyMmbSoptoPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyMmbSoptoPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
