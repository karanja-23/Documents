import { TestBed } from '@angular/core/testing';

import { OpacityService } from './opacity.service';

describe('OpacityService', () => {
  let service: OpacityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpacityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
