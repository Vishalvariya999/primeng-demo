import { TestBed } from '@angular/core/testing';

import { ShowStudentsResolver } from './show-students.resolver';

describe('ShowStudentsResolver', () => {
  let resolver: ShowStudentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ShowStudentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
