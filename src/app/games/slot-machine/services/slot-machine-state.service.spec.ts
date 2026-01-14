import { TestBed } from '@angular/core/testing';

import { SlotMachineStateService } from './slot-machine-state.service';

describe('SlotMachineStateService', () => {
  let service: SlotMachineStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotMachineStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
