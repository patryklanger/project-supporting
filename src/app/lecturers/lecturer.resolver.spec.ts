import { TestBed } from '@angular/core/testing';

import { LecturerResolver } from './lecturer.resolver';

describe('LecturerResolver', () => {
  let resolver: LecturerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LecturerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
