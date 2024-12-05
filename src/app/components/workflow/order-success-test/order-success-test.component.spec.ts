import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccessTestComponent } from './order-success-test.component';

describe('OrderSuccessTestComponent', () => {
  let component: OrderSuccessTestComponent;
  let fixture: ComponentFixture<OrderSuccessTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSuccessTestComponent]
    });
    fixture = TestBed.createComponent(OrderSuccessTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
