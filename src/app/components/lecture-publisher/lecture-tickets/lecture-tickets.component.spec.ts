import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureTicketsComponent } from './lecture-tickets.component';

describe('LectureTicketsComponent', () => {
  let component: LectureTicketsComponent;
  let fixture: ComponentFixture<LectureTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LectureTicketsComponent]
    });
    fixture = TestBed.createComponent(LectureTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
