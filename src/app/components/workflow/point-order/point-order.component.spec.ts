import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOrderComponent } from './point-order.component';

describe('PointOrderComponent', () => {
  let component: PointOrderComponent;
  let fixture: ComponentFixture<PointOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointOrderComponent]
    });
    fixture = TestBed.createComponent(PointOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
