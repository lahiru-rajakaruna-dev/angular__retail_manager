import { TestBed } from '@angular/core/testing';

import { PopRenderer } from './pop-renderer';

describe('PopRenderer', () => {
  let service: PopRenderer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopRenderer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
