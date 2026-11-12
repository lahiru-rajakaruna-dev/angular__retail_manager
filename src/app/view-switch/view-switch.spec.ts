import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSwitch } from './view-switch';

describe('ViewSwitch', () => {
  let component: ViewSwitch;
  let fixture: ComponentFixture<ViewSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSwitch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
