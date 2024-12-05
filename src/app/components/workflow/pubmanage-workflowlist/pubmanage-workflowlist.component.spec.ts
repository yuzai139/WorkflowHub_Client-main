import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmanageWorkflowlistComponent } from './pubmanage-workflowlist.component';

describe('PubmanageWorkflowlistComponent', () => {
  let component: PubmanageWorkflowlistComponent;
  let fixture: ComponentFixture<PubmanageWorkflowlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubmanageWorkflowlistComponent]
    });
    fixture = TestBed.createComponent(PubmanageWorkflowlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
