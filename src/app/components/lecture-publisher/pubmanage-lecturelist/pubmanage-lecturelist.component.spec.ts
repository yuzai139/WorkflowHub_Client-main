import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmanageLecturelistComponent } from './pubmanage-lecturelist.component';

describe('PubmanageLecturelistComponent', () => {
  let component: PubmanageLecturelistComponent;
  let fixture: ComponentFixture<PubmanageLecturelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubmanageLecturelistComponent]
    });
    fixture = TestBed.createComponent(PubmanageLecturelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
