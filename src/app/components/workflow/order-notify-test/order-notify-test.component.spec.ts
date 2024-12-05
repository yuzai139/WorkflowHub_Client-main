import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotifyTestComponent } from './order-notify-test.component';

describe('OrderNotifyTestComponent', () => {
  let component: OrderNotifyTestComponent;
  let fixture: ComponentFixture<OrderNotifyTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderNotifyTestComponent]
    });
    fixture = TestBed.createComponent(OrderNotifyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
