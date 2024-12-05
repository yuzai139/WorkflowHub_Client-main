import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberUpgradeComponent } from './member-upgrade.component';

describe('MemberUpgradeComponent', () => {
  let component: MemberUpgradeComponent;
  let fixture: ComponentFixture<MemberUpgradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberUpgradeComponent]
    });
    fixture = TestBed.createComponent(MemberUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
