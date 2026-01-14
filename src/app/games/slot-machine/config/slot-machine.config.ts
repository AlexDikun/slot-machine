// src/app/games/slot-machine/config/slot-machine.config.ts

export const SLOT_MACHINE_CONFIG = {
  REELS_COUNT: 5, // количество барабанов
  VISIBLE_SYMBOLS: 3, // количество видимых символов барабана
  SYMBOL_HEIGHT: 60, // высота одного символа
  SPIN_BASE_DURATION: 2.5, // базовая длительность анимации вращения
} as const;