import { TestBed } from '@angular/core/testing';

import { SlotMachineEngineService } from '../services/slot-machine-engine.service';

describe('SlotMachineEngineService', () => {
  let service: SlotMachineEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotMachineEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
