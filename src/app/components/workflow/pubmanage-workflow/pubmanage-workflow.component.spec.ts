import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmanageWorkflowComponent } from './pubmanage-workflow.component';

describe('PubmanageWorkflowComponent', () => {
  let component: PubmanageWorkflowComponent;
  let fixture: ComponentFixture<PubmanageWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubmanageWorkflowComponent]
    });
    fixture = TestBed.createComponent(PubmanageWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
