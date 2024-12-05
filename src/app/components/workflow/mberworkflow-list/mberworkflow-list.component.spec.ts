import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MberworkflowListComponent } from './mberworkflow-list.component';

describe('MberworkflowListComponent', () => {
  let component: MberworkflowListComponent;
  let fixture: ComponentFixture<MberworkflowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MberworkflowListComponent]
    });
    fixture = TestBed.createComponent(MberworkflowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
