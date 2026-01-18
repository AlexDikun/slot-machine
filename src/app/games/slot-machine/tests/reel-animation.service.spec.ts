import { TestBed } from '@angular/core/testing';

import { ReelAnimationService } from '../services/reel-animation.service';

describe('ReelAnimationService', () => {
  let service: ReelAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReelAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
