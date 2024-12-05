import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherSerchComponent } from './publisher-serch.component';

describe('PublisherSerchComponent', () => {
  let component: PublisherSerchComponent;
  let fixture: ComponentFixture<PublisherSerchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherSerchComponent]
    });
    fixture = TestBed.createComponent(PublisherSerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
