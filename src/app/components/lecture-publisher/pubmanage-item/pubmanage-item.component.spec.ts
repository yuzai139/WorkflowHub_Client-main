import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmanageItemComponent } from './pubmanage-item.component';

describe('PubmanageItemComponent', () => {
  let component: PubmanageItemComponent;
  let fixture: ComponentFixture<PubmanageItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubmanageItemComponent]
    });
    fixture = TestBed.createComponent(PubmanageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
