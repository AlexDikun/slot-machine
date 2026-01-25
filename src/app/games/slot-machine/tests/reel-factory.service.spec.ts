import { TestBed } from '@angular/core/testing';

import { ReelFactoryService } from '../services/reel-factory.service';

describe('ReelFactoryService', () => {
  let service: ReelFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReelFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
