import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MberworkflowIndexComponent } from './mberworkflow-index.component';

describe('MberworkflowIndexComponent', () => {
  let component: MberworkflowIndexComponent;
  let fixture: ComponentFixture<MberworkflowIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MberworkflowIndexComponent]
    });
    fixture = TestBed.createComponent(MberworkflowIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
