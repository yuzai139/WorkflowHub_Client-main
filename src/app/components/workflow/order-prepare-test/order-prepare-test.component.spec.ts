import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPrepareTestComponent } from './order-prepare-test.component';

describe('OrderPrepareTestComponent', () => {
  let component: OrderPrepareTestComponent;
  let fixture: ComponentFixture<OrderPrepareTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPrepareTestComponent]
    });
    fixture = TestBed.createComponent(OrderPrepareTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
