import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { SYMBOLS_CONFIG, SymbolConfig } from '../config/symbols.config';
import { SlotMachineLogicService } from '../services/slot-machine-logic.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-slot-machine',
  standalone: false,
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss'],
})
export class SlotMachineComponent implements AfterViewInit {

  @ViewChild('reelsContainer', { static: true })
  reelsContainer!: ElementRef<HTMLElement>;

  constructor(
    private elRef: ElementRef,
    private slotLogic: SlotMachineLogicService
  ) {
    this.initReels();
  }

  readonly SYMBOL_HEIGHT = 60;
  readonly VISIBLE_SYMBOLS = 3;
  readonly REELS_COUNT = 5;

  isSpinning = false;

  // ===== BET SELECTOR =====
  bets: number[] = [50, 100, 200, 300];
  currentBet = 50;
  showBetOptions = false;

  // ===== SYMBOLS =====
  symbols: SymbolConfig[] = SYMBOLS_CONFIG; 

  reels: SymbolConfig[][] = [];

  // ===== PROGRESS WILD SYMBOLS =====
  goldWildProgress = 0;
  silverWildProgress = 0;

  ngAfterViewInit(): void {
    const reelElements = this.reelsContainer.nativeElement.querySelectorAll<HTMLElement>(
      '.slot-machine__reel-inner'
    );

    reelElements.forEach(reel => {
      gsap.set(reel, { y: 0 });
    });
  }

  private initReels(): void {
    const reelLength = this.symbols.length * 40;
    this.reels = Array.from({ length: this.REELS_COUNT }, () =>
      Array.from({ length: reelLength }, () => this.getRandomSymbol())
    );
  }

  startSpin(): void {
    if (this.isSpinning) return;

    this.isSpinning = true;

    const reelElements =
      this.reelsContainer.nativeElement.querySelectorAll<HTMLElement>(
        '.slot-machine__reel-inner'
      );

    // ФИНАЛ СПИНА (5 × 3)
    const spinResultIds = this.slotLogic.generateReels();

    let finished = 0;

    reelElements.forEach((reelEl, index) => {
      // 👇 ключевая интеграция
      const stopIndex = this.prepareReelStop(
        index,
        spinResultIds[index]
      );

      const extraSpins = Math.floor(Math.random() * 10) * this.VISIBLE_SYMBOLS;
      const finalIndex = stopIndex + extraSpins;
      const finalY = -finalIndex * this.SYMBOL_HEIGHT;

      gsap.to(reelEl, {
        y: finalY,
        duration: 2.5 + index * 0.3,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(reelEl, { y: -stopIndex * this.SYMBOL_HEIGHT });

          this.reels[index] = [
            ...this.reels[index].slice(stopIndex, stopIndex + this.VISIBLE_SYMBOLS),
            ...this.reels[index].filter(
              (_, i) => i < stopIndex || i >= stopIndex + this.VISIBLE_SYMBOLS
            ),
          ];

          // обновляем wild-прогресс
          this.reels[index]
            .slice(0, this.VISIBLE_SYMBOLS)
            .forEach(s => this.updateWildProgress(s));

          finished++;
          if (finished === reelElements.length) {
            this.isSpinning = false;

            // можно считать выигрыш
            this.onSpinFinished(spinResultIds);
          }
        },
      });
    });
  }


  private prepareReelStop(
    reelIndex: number,
    finalSymbolIds: string[]
  ): number {
    const reel = this.reels[reelIndex];
    const step = this.VISIBLE_SYMBOLS;

    const maxIndex = reel.length - step;
    const maxStepIndex = Math.floor(maxIndex / step);
    const stopIndex =
      Math.floor(Math.random() * maxStepIndex) * step;

    // подменяем символы в точке остановки
    for (let i = 0; i < step; i++) {
      const symbolConfig = this.symbols.find(
        s => s.id === finalSymbolIds[i]
      );

      if (symbolConfig) {
        reel[stopIndex + i] = symbolConfig;
      }
    }

    return stopIndex;
  }

  private onSpinFinished(spinResultIds: string[][]) {
    const win = this.slotLogic.calculateWin(
      spinResultIds,
      this.currentBet
    );

    console.log('WIN:', win);
  }

  private getRandomSymbol(): SymbolConfig {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  // ===== BET UI =====
  onBetHover(state: boolean) {
    if (this.isSpinning) return;
    this.showBetOptions = state;
  }

  selectBet(bet: number) {
    if (this.isSpinning) return;
    this.currentBet = bet;
    this.showBetOptions = false;
  }

  // ===== отслеживаем клики вне селектора =====
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showBetOptions = false;
    }
  }

  updateWildProgress(symbol: SymbolConfig) {
    if (symbol.type !== 'wild' || !symbol.wildProgress) return;

    if (symbol.type === 'wild') {
      this.goldWildProgress = Math.min(
        this.goldWildProgress + symbol.wildProgress,
        100
      );
    }

    if (symbol.type === 'wild') {
      this.silverWildProgress = Math.min(
        this.silverWildProgress + symbol.wildProgress,
        100
      );
   }
 }
}
