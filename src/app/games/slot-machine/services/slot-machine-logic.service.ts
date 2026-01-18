// src/app/games/slot-machine/services/slot-machine-logic.service.ts
import { Injectable } from '@angular/core';
import { SYMBOLS_CONFIG } from '../config/symbols.config';
import { SymbolConfig } from '../config/symbols.config';
import { SLOT_MACHINE_CONFIG } from '../config/slot-machine.config';
import { ReelViewModel } from '../models/reel-view.model';

@Injectable({
  providedIn: 'root',
})
export class SlotMachineLogicService {
  constructor() {}

  calculateWin(reels: SymbolConfig[][], bet: number): number {
    let win = 0;

    for (let i = 0; i < reels.length; i++) {
      const column = reels[i];
      const symbol = column[0];
      const count = column.length as 3 | 4 | 5;
      if (column.every(s => s.id === symbol.id)) {
        const multiplier = symbol.multipliers?.[count] ?? 0;
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
