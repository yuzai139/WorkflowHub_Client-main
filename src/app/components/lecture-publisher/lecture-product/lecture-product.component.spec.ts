import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureProductComponent } from './lecture-product.component';

describe('LectureProductComponent', () => {
  let component: LectureProductComponent;
  let fixture: ComponentFixture<LectureProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LectureProductComponent]
    });
    fixture = TestBed.createComponent(LectureProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
