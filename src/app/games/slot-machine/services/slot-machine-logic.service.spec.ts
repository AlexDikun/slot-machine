import { TestBed } from '@angular/core/testing';

import { SlotMachineLogicService } from './slot-machine-logic.service';

describe('SlotMachineLogicService', () => {
  let service: SlotMachineLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotMachineLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
