import { TestBed } from '@angular/core/testing';

import { StudentDetailsResolver } from './student-details.resolver';

describe('StudentDetailsResolver', () => {
  let resolver: StudentDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StudentDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
