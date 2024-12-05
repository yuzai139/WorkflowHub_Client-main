import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBackupComponent } from './order-backup.component';

describe('OrderBackupComponent', () => {
  let component: OrderBackupComponent;
  let fixture: ComponentFixture<OrderBackupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderBackupComponent]
    });
    fixture = TestBed.createComponent(OrderBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
