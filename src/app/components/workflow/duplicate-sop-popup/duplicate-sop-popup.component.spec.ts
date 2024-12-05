import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateSopPopupComponent } from './duplicate-sop-popup.component';

describe('DuplicateSopPopupComponent', () => {
  let component: DuplicateSopPopupComponent;
  let fixture: ComponentFixture<DuplicateSopPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuplicateSopPopupComponent]
    });
    fixture = TestBed.createComponent(DuplicateSopPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
