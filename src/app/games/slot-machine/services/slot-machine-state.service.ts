// src/app/games/slot-machine/services/slot-machine-state.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SymbolConfig } from '../config';
import { ScatterProgressService } from './scatter-progress.service';

@Injectable({
  providedIn: 'root'
})
export class SlotMachineStateService {
  readonly isSpinning$ = new BehaviorSubject(false); 
  readonly currentBet$ = new BehaviorSubject(50);

  readonly goldScatterProgress$ = new BehaviorSubject(0);
  readonly silverScatterProgress$ = new BehaviorSubject(0);

  constructor(private scatterProgress: ScatterProgressService) {}

  setSpinning(v: boolean) {
    this.isSpinning$.next(v);
  }

  setBet(bet: number) {
    this.currentBet$.next(bet);
    this.scatterProgress.reset();
  }

}
