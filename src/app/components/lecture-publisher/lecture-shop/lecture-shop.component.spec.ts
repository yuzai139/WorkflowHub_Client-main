import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureShopComponent } from './lecture-shop.component';

describe('LectureShopComponent', () => {
  let component: LectureShopComponent;
  let fixture: ComponentFixture<LectureShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LectureShopComponent]
    });
    fixture = TestBed.createComponent(LectureShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
