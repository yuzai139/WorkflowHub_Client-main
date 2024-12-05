import { TestBed } from '@angular/core/testing';

import { PointRecordService } from './point-record.service';

describe('PointRecordService', () => {
  let service: PointRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
