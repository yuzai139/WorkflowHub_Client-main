import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherLecturelistComponent } from './publisher-lecturelist.component';

describe('PublisherLecturelistComponent', () => {
  let component: PublisherLecturelistComponent;
  let fixture: ComponentFixture<PublisherLecturelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherLecturelistComponent]
    });
    fixture = TestBed.createComponent(PublisherLecturelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
