import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureSerchComponent } from './lecture-serch.component';

describe('LectureSerchComponent', () => {
  let component: LectureSerchComponent;
  let fixture: ComponentFixture<LectureSerchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LectureSerchComponent]
    });
    fixture = TestBed.createComponent(LectureSerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
