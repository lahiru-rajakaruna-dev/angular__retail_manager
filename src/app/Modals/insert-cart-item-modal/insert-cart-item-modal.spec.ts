import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCartItemModal } from './insert-cart-item-modal';

describe('InsertCartItemModal', () => {
  let component: InsertCartItemModal;
  let fixture: ComponentFixture<InsertCartItemModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertCartItemModal],
    }).compileComponents();

    fixture = TestBed.createComponent(InsertCartItemModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
