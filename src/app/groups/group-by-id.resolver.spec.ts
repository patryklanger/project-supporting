import { TestBed } from '@angular/core/testing';

import { GroupByIdResolver } from './group-by-id.resolver';

describe('GroupByIdResolver', () => {
  let resolver: GroupByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GroupByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
