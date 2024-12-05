import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherBankaccountComponent } from './publisher-bankaccount.component';

describe('PublisherBankaccountComponent', () => {
  let component: PublisherBankaccountComponent;
  let fixture: ComponentFixture<PublisherBankaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherBankaccountComponent]
    });
    fixture = TestBed.createComponent(PublisherBankaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
