// src/app/games/slot-machine/services/slot-machine-logic.service.ts
import { Injectable } from '@angular/core';
import { SYMBOLS_CONFIG } from '../config/symbols.config';
import { SymbolConfig } from '../config/symbols.config';

@Injectable({
  providedIn: 'root',
})
export class SlotMachineLogicService {
  constructor() {}

  generateReels(): string[][] {
    return Array.from({ length: 5 }, () => 
      Array.from({ length: 3 }, () => this.getRandomSymbol())
    );
  }

  private getRandomSymbol(): string {
    const symbol = SYMBOLS_CONFIG[Math.floor(Math.random() * SYMBOLS_CONFIG.length)];
    return symbol.id;
  }

  calculateWin(reels: string[][], bet: number): number {
    let win = 0;
    
    for (let i = 0; i < 5; i++) {
      const column = reels[i];
      const symbol = column[0]; // Проверка первого символа в колонке

      // Если все символы на барабанах совпадают
      if (column.every(s => s === symbol)) {
        const symbolConfig = SYMBOLS_CONFIG.find(s => s.id === symbol);
        if (symbolConfig) {
          const multiplier = symbolConfig?.multipliers?.[3] || 1; 
          win += bet * multiplier;
        }
      }
    }

    return win;
  }

  calculateWithWilds(reels: string[][], bet: number): number {
    let win = 0;
    return win;
  }
}
