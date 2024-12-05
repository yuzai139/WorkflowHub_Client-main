import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninCompletedComponent } from './signin-completed.component';

describe('SigninCompletedComponent', () => {
  let component: SigninCompletedComponent;
  let fixture: ComponentFixture<SigninCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninCompletedComponent]
    });
    fixture = TestBed.createComponent(SigninCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
