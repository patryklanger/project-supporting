import { TestBed } from '@angular/core/testing';

import { LecturerByIdResolver } from './lecturer-by-id.resolver';

describe('LecturerByIdResolver', () => {
  let resolver: LecturerByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LecturerByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
