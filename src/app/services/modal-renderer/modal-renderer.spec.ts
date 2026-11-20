import { TestBed } from '@angular/core/testing';

import { ModalRenderer } from '../../modal-renderer';

describe('ModalRenderer', () => {
  let service: ModalRenderer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalRenderer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
