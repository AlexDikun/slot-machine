// src/app/games/slot-machine/services/slot-machine-state.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SymbolConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SlotMachineStateService {
  readonly isSpinning$ = new BehaviorSubject(false); 
  readonly currentBet$ = new BehaviorSubject(50);

  readonly goldScatterProgress$ = new BehaviorSubject(0);
  readonly silverScatterProgress$ = new BehaviorSubject(0);

  setSpinning(v: boolean) {
    this.isSpinning$.next(v);
  }

  setBet(bet: number) {
    this.currentBet$.next(bet);
    this.resetScatterrogress();
  }

  addScatterProgress(symbol: SymbolConfig) {
    if (symbol.type !== 'scatter' || !symbol.scatterProgress) return;

    if (symbol.id === 'scatter1') {}
    this.goldScatterProgress$.next(
      Math.min(this.goldScatterProgress$.value + symbol.scatterProgress, 70)
    );

    if (symbol.id === 'scatter2') {}
    this.silverScatterProgress$.next(
      Math.min(this.silverScatterProgress$.value + symbol.scatterProgress, 70)
    );
  }

  resetScatterrogress() {
    this.goldScatterProgress$.next(0);
    this.silverScatterProgress$.next(0);
  }

}
