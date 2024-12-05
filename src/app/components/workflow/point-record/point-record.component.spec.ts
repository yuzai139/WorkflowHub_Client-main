import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointRecordComponent } from './point-record.component';

describe('PointRecordComponent', () => {
  let component: PointRecordComponent;
  let fixture: ComponentFixture<PointRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointRecordComponent]
    });
    fixture = TestBed.createComponent(PointRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
