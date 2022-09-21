import { TestBed } from '@angular/core/testing';

import { StudentByIdResolver } from './student-by-id.resolver';

describe('StudentByIdResolver', () => {
  let resolver: StudentByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StudentByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
