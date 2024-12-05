import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WkflowmarketProductComponent } from './wkflowmarket-product.component';

describe('WkflowmarketProductComponent', () => {
  let component: WkflowmarketProductComponent;
  let fixture: ComponentFixture<WkflowmarketProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WkflowmarketProductComponent]
    });
    fixture = TestBed.createComponent(WkflowmarketProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
