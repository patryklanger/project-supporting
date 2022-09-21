import { TestBed } from '@angular/core/testing';

import { TopicByIdResolver } from './topic-by-id.resolver';

describe('TopicByIdResolver', () => {
  let resolver: TopicByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TopicByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
