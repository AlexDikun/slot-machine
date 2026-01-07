// src/app/games/slot-machine/config/symbols.config.ts

export type SymbolType = 'regular' | 'wild';

export interface SymbolConfig {
  id: string;
  name: string;
  icon: string;
  type: SymbolType;
  weight?: number;
  multipliers?: {         
    3?: number;           
    4?: number;          
    5?: number; 
  };
}
export const SYMBOLS_CONFIG: SymbolConfig[] = [
  {
    id: 'six',
    name: 'Crow',
    icon: 'assets/symbols/six-icon.jpg',
    type: 'regular',
    weight: 15,
    multipliers: { 3: 0.5, 4: 2, 5: 7.5 }
  },
  {
    id: 'seven',
    name: 'Basileus',
    icon: 'assets/symbols/seven-icon.jpg',
    type: 'regular',
    weight: 14,
    multipliers: { 3: 0.7, 4: 2.5, 5: 10 }
  },
  {
    id: 'eight',
    name: 'Solovey',
    icon: 'assets/symbols/eight-icon.jpg',
    type: 'regular',
    weight: 13,
    multipliers: { 3: 1, 4: 3, 5: 15 }
  },
  {
    id: 'nine',
    name: 'Felicita',
    icon: 'assets/symbols/nine-icon.jpg',
    type: 'regular',
    weight: 12,
    multipliers: { 3: 1.2, 4: 4, 5: 20 }
  },
  {
    id: 'ten',
    name: 'Tugarin',
    icon: 'assets/symbols/ten-icon.jpg',
    type: 'regular',
    weight: 10,
    multipliers: { 3: 1.5, 4: 5, 5: 30 }
  },
  {
    id: 'jack',
    name: 'Kalyvan',
    icon: 'assets/symbols/jack-icon.jpg',
    type: 'regular',
    weight: 8,
    multipliers: { 3: 2, 4: 6, 5: 40 }
  },
  {
    id: 'lady',
    name: 'BabaYaga',
    icon: 'assets/symbols/lady-icon.jpg',
    type: 'regular',
    weight: 6,
    multipliers: { 3: 2.5, 4: 9, 5: 50 }
  },
  {
    id: 'king',
    name: 'Koschei',
    icon: 'assets/symbols/king-icon.jpg',
    type: 'regular',
    weight: 5,
    multipliers: { 3: 3, 4: 10, 5: 75 }
  },
  {
    id: 'ace',
    name: 'Gorynych',
    icon: 'assets/symbols/ace-icon.jpg',
    type: 'regular',
    weight: 3,
    multipliers: { 3: 5, 4: 15, 5: 100 }
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

