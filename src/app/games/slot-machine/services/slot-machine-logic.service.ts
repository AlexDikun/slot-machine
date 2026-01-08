// src/app/games/slot-machine/services/slot-machine-logic.service.ts
import { Injectable } from '@angular/core';
import { SYMBOLS_CONFIG } from '../config/symbols.config';
import { SymbolConfig } from '../config/symbols.config';

@Injectable({
  providedIn: 'root',
})
export class SlotMachineLogicService {
  constructor() {}

  // Генерация случайных символов на барабанах
  generateReels(): string[][] {
    // Заполняем барабаны случайными символами
    return Array.from({ length: 5 }, () => 
      Array.from({ length: 3 }, () => this.getRandomSymbol())
    );
  }

  // Получить случайный символ на основе SYMBOLS_CONFIG
  private getRandomSymbol(): string {
    const symbol = SYMBOLS_CONFIG[Math.floor(Math.random() * SYMBOLS_CONFIG.length)];
    return symbol.id;
  }

  // Проверка выигрыша на основе выпавших символов
  calculateWin(reels: string[][], bet: number): number {
    let win = 0;
    
    for (let i = 0; i < 5; i++) {
      const column = reels[i];
      const symbol = column[0]; // Проверка первого символа в колонке

      // Если все символы на барабанах совпадают
      if (column.every(s => s === symbol)) {
        // Получаем данные для этого символа
        const symbolConfig = SYMBOLS_CONFIG.find(s => s.id === symbol);
        if (symbolConfig) {
          const multiplier = symbolConfig?.multipliers?.[3] || 1; // Для примера: ставка на 3 символа
          win += bet * multiplier;
        }
      }
    }

    return win;
  }

  // Вычисление выигрыша с учетом wild
  calculateWithWilds(reels: string[][], bet: number): number {
    let win = 0;
    // Дополнительная логика для wild символов
    // Например, если символ Wild заменяет другой символ, увеличиваем выигрыш
    return win;
  }
}
