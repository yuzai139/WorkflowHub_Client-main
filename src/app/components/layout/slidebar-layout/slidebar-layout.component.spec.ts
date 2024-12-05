import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidebarLayoutComponent } from './slidebar-layout.component';

describe('SlidebarLayoutComponent', () => {
  let component: SlidebarLayoutComponent;
  let fixture: ComponentFixture<SlidebarLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlidebarLayoutComponent]
    });
    fixture = TestBed.createComponent(SlidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
