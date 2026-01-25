import { TestBed } from '@angular/core/testing';

import { ScatterProgressService } from '../services/scatter-progress.service';

describe('ScatterProgressService', () => {
  let service: ScatterProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScatterProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
