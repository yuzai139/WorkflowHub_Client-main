import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherWorkflowlistComponent } from './publisher-workflowlist.component';

describe('PublisherWorkflowlistComponent', () => {
  let component: PublisherWorkflowlistComponent;
  let fixture: ComponentFixture<PublisherWorkflowlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherWorkflowlistComponent]
    });
    fixture = TestBed.createComponent(PublisherWorkflowlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
