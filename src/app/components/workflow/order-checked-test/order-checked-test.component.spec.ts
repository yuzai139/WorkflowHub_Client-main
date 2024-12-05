import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCheckedTestComponent } from './order-checked-test.component';

describe('OrderCheckedTestComponent', () => {
  let component: OrderCheckedTestComponent;
  let fixture: ComponentFixture<OrderCheckedTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCheckedTestComponent]
    });
    fixture = TestBed.createComponent(OrderCheckedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
