import { TestBed } from '@angular/core/testing';

import { TreeselectService } from './treeselect.service';

describe('TreeselectService', () => {
  let service: TreeselectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeselectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
