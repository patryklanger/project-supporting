import { TestBed } from '@angular/core/testing';

import { AllGroupsResolver } from './all-groups.resolver';

describe('AllGroupsResolver', () => {
  let resolver: AllGroupsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllGroupsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
