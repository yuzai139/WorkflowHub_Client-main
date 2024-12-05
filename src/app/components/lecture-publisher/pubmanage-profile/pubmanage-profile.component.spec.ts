import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmanageProfileComponent } from './pubmanage-profile.component';

describe('PubmanageProfileComponent', () => {
  let component: PubmanageProfileComponent;
  let fixture: ComponentFixture<PubmanageProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubmanageProfileComponent]
    });
    fixture = TestBed.createComponent(PubmanageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
