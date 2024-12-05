import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MberworkflowItemComponent } from './mberworkflow-item.component';

describe('MberworkflowItemComponent', () => {
  let component: MberworkflowItemComponent;
  let fixture: ComponentFixture<MberworkflowItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MberworkflowItemComponent]
    });
    fixture = TestBed.createComponent(MberworkflowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
