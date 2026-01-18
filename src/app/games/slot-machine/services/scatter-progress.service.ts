// src/app/games/slot-machine/services/scatter-progress.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SymbolConfig } from '../config/symbols.config';

@Injectable({
  providedIn: 'root',
})
export class ScatterProgressService {

  readonly goldProgress$ = new BehaviorSubject(0);
  readonly silverProgress$ = new BehaviorSubject(0);
  private readonly MAX_PROGRESS = 70; 

  constructor() {}

  add(symbol: SymbolConfig) {
    if (symbol.type !== 'scatter' || !symbol.scatterProgress) return;

    if (symbol.id === 'scatter1') {
      this.goldProgress$.next(
        Math.min(this.goldProgress$.value + symbol.scatterProgress, this.MAX_PROGRESS)
      );
    }
    if (symbol.id === 'scatter2') {
      this.silverProgress$.next(
        Math.min(this.silverProgress$.value + symbol.scatterProgress, this.MAX_PROGRESS)
      );
    }
  }

  reset() {
    this.goldProgress$.next(0);
    this.silverProgress$.next(0);
  }
}
