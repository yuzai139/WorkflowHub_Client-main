import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WkflowmarketListComponent } from './wkflowmarket-list.component';

describe('WkflowmarketListComponent', () => {
  let component: WkflowmarketListComponent;
  let fixture: ComponentFixture<WkflowmarketListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WkflowmarketListComponent]
    });
    fixture = TestBed.createComponent(WkflowmarketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
