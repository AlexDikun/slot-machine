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

  readonly goldWildProgress$ = new BehaviorSubject(0);
  readonly silverWildProgress$ = new BehaviorSubject(0);

  setSpinning(v: boolean) {
    this.isSpinning$.next(v);
  }

  setBet(bet: number) {
    this.currentBet$.next(bet);
  }

  addWildProgress(symbol: SymbolConfig) {
    if (symbol.type !== 'wild' || !symbol.wildProgress) return;

    if (symbol.id === 'wild1') {}
    this.goldWildProgress$.next(
      Math.min(this.goldWildProgress$.value + symbol.wildProgress, 100)
    );

    if (symbol.id === 'wild2') {}
    this.silverWildProgress$.next(
      Math.min(this.silverWildProgress$.value + symbol.wildProgress, 100)
    );
  }

  resetWildProgress() {
    this.goldWildProgress$.next(0);
    this.silverWildProgress$.next(0);
  }
}
