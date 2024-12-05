import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmanageMainComponent } from './pubmanage-main.component';

describe('PubmanageMainComponent', () => {
  let component: PubmanageMainComponent;
  let fixture: ComponentFixture<PubmanageMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubmanageMainComponent]
    });
    fixture = TestBed.createComponent(PubmanageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
