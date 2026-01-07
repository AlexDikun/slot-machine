// src/app/games/slot-machine/config/symbols.config.ts

export type SymbolType = 'regular' | 'wild';

export interface SymbolConfig {
  id: string;
  name: string;
  icon: string;
  type: SymbolType;
  weight?: number;
}
export const SYMBOLS_CONFIG: SymbolConfig[] = [
  {
    id: 'six',
    name: 'Crow',
    icon: 'assets/symbols/six-icon.jpg',
    type: 'regular',
    weight: 10,
  },
  {
    id: 'seven',
    name: 'Basileus',
    icon: 'assets/symbols/seven-icon.jpg',
    type: 'regular',
    weight: 9,
  },
  {
    id: 'eight',
    name: 'Solovey',
    icon: 'assets/symbols/eight-icon.jpg',
    type: 'regular',
    weight: 9,
  },
  {
    id: 'nine',
    name: 'Felicita',
    icon: 'assets/symbols/nine-icon.jpg',
    type: 'regular',
    weight: 8,
  },
  {
    id: 'ten',
    name: 'Tugarin',
    icon: 'assets/symbols/ten-icon.jpg',
    type: 'regular',
    weight: 8,
  },
  {
    id: 'jack',
    name: 'Kalyvan',
    icon: 'assets/symbols/jack-icon.jpg',
    type: 'regular',
    weight: 7,
  },
  {
    id: 'lady',
    name: 'BabaYaga',
    icon: 'assets/symbols/lady-icon.jpg',
    type: 'regular',
    weight: 6,
  },
  {
    id: 'king',
    name: 'Koschei',
    icon: 'assets/symbols/king-icon.jpg',
    type: 'regular',
    weight: 6,
  },
  {
    id: 'ace',
    name: 'Gorynych',
    icon: 'assets/symbols/ace-icon.jpg',
    type: 'regular',
    weight: 5,
  },

  // ===== WILDS =====
  {
    id: 'wild1',
    name: 'Golden Horseshoe',
    icon: 'assets/symbols/wildGoldenHorseshoe-icon.jpg',
    type: 'wild',
    weight: 2,
  },
  {
    id: 'wild2',
    name: 'Silver Horseshoe',
    icon: 'assets/symbols/wildSilverHorseshoe-icon.jpg',
    type: 'wild',
    weight: 3,
  },
];

