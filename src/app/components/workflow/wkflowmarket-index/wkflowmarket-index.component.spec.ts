import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WkflowmarketIndexComponent } from './wkflowmarket-index.component';

describe('WkflowmarketIndexComponent', () => {
  let component: WkflowmarketIndexComponent;
  let fixture: ComponentFixture<WkflowmarketIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WkflowmarketIndexComponent]
    });
    fixture = TestBed.createComponent(WkflowmarketIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
