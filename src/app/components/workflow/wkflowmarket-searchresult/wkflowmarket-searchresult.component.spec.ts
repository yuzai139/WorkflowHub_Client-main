import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WkflowmarketSearchresultComponent } from './wkflowmarket-searchresult.component';

describe('WkflowmarketSearchresultComponent', () => {
  let component: WkflowmarketSearchresultComponent;
  let fixture: ComponentFixture<WkflowmarketSearchresultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WkflowmarketSearchresultComponent]
    });
    fixture = TestBed.createComponent(WkflowmarketSearchresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
