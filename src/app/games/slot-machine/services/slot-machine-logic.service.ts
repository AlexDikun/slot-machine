// src/app/games/slot-machine/services/slot-machine-logic.service.ts
import { Injectable } from '@angular/core';
import { SYMBOLS_CONFIG } from '../config/symbols.config';
import { SymbolConfig } from '../config/symbols.config';

@Injectable({
  providedIn: 'root',
})
export class SlotMachineLogicService {
  constructor() {}

  private getRandomSymbol(): SymbolConfig {
    return SYMBOLS_CONFIG[Math.floor(Math.random() * SYMBOLS_CONFIG.length)];
  }

  generateReels(): SymbolConfig[][] {
    return Array.from({ length: 5 }, () =>
      Array.from({ length: 3 }, () => this.getRandomSymbol())
    );
  }

  calculateWin(reels: SymbolConfig[][], bet: number): number {
    let win = 0;

    for (let i = 0; i < reels.length; i++) {
      const column = reels[i];
      const symbol = column[0];
      const count = column.length as 3 | 4 | 5;
      if (column.every(s => s.id === symbol.id)) {
        const multiplier = symbol.multipliers?.[count] ?? 1;
        win += bet * multiplier;
      }
    }

    return win;
  }

  calculateWithWilds(reels: string[][], bet: number): number {
    let win = 0;
    return win;
  }
}
