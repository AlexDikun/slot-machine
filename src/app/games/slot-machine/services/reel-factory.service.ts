// src/app/games/slot-machine/services/reel-factory.service.ts

import { Injectable } from '@angular/core';
import { SLOT_MACHINE_CONFIG } from '../config/slot-machine.config';
import { SYMBOLS_CONFIG, SymbolConfig } from '../config/symbols.config';
import { ReelViewModel } from '../models/reel-view.model';

@Injectable({
  providedIn: 'root',
})
export class ReelFactoryService {

  constructor() {}

  private getRandomSymbol(): SymbolConfig {
    const total = SYMBOLS_CONFIG.length;
    const index = Math.floor(Math.random() * total);
    return SYMBOLS_CONFIG[index];
  }

  createInitialReels(): ReelViewModel[] {
    return Array.from({ length: SLOT_MACHINE_CONFIG.REELS_COUNT }, () => {
      const bufferSymbols = Array.from(
        { length: SLOT_MACHINE_CONFIG.BUFFER_SYMBOLS },
        () => this.getRandomSymbol()
      );

      const visibleSymbols = Array.from(
        { length: SLOT_MACHINE_CONFIG.VISIBLE_SYMBOLS },
        () => this.getRandomSymbol()
      );

      return {
        symbols: [...bufferSymbols, ...visibleSymbols],
        stopIndex: visibleSymbols.length - 1,
      };
    });
  }

  createReelsForSpin(): ReelViewModel[] {
    return Array.from({ length: SLOT_MACHINE_CONFIG.REELS_COUNT }, () => {
      const bufferSymbols = Array.from(
        { length: SLOT_MACHINE_CONFIG.BUFFER_SYMBOLS },
        () => this.getRandomSymbol()
      );
      const finalSymbols = Array.from(
        { length: SLOT_MACHINE_CONFIG.VISIBLE_SYMBOLS },
        () => this.getRandomSymbol()
      );

      return {
        symbols: [...bufferSymbols, ...finalSymbols],
        stopIndex: bufferSymbols.length,
      };
    });
  }
}
