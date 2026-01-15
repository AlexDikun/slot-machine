// src/app/games/slot-machine/models/reel-view.model.ts

import { SymbolConfig } from '../config/symbols.config';

export interface ReelViewModel {
  symbols: SymbolConfig[]; // buffer symbols and finals
  stopIndex: number;       // индекс верхнего видимого символа
}