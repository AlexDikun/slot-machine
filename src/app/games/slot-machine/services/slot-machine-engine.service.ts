// src/app/games/slot-machine/services/slot-machine-engine.service.ts

import { Injectable } from '@angular/core';
import { SlotMachineLogicService } from './slot-machine-logic.service';
import { SlotMachineStateService } from './slot-machine-state.service';

@Injectable({
  providedIn: 'root'
})
export class SlotMachineEngineService {
  constructor(
    private logic: SlotMachineLogicService,
    private state: SlotMachineStateService
  ) {}

  spin() {
    this.state.setSpinning(true);              // блокируем кнопки, запускаем анимацию

    const reels = this.logic.generateReels();  // создаём новую комбинацию для барабанов

    return {
      reels,
      onFinish: () => {
        const finalSymbols = reels.map(r =>
          r.symbols.slice(r.stopIndex)
        );
        
        const win = this.logic.calculateWin(
          finalSymbols,                               
          this.state.currentBet$.value         
        );

        this.state.setSpinning(false);         // спин завершен  
        return win;
      },
    };
  }

  initReels() {
    return this.logic.generateInitialReels();
  }
}