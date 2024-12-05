import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvaLayoutComponent } from './canva-layout.component';

describe('CanvaLayoutComponent', () => {
  let component: CanvaLayoutComponent;
  let fixture: ComponentFixture<CanvaLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvaLayoutComponent]
    });
    fixture = TestBed.createComponent(CanvaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
