// slot-machine.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

interface SymbolItem {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-slot-machine',
  standalone: false,
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss'],
})
export class SlotMachineComponent implements AfterViewInit {

  @ViewChild('reelsContainer', { static: true })
  reelsContainer!: ElementRef<HTMLElement>;

  readonly SYMBOL_HEIGHT = 60;
  readonly VISIBLE_SYMBOLS = 3;
  readonly REELS_COUNT = 5;

  isSpinning = false;

  symbols: SymbolItem[] = [
    { id: 'six', name: 'Crow', icon: 'assets/symbols/six-icon.jpg' },
    { id: 'seven', name: 'Basileus', icon: 'assets/symbols/seven-icon.jpg' },
    { id: 'eight', name: 'Solovey', icon: 'assets/symbols/eight-icon.jpg' },
    { id: 'nine', name: 'Felicita', icon: 'assets/symbols/nine-icon.jpg' },
    { id: 'ten', name: 'Tugarin', icon: 'assets/symbols/ten-icon.jpg' },
    { id: 'jack', name: 'Kalyvan', icon: 'assets/symbols/jack-icon.jpg' },
    { id: 'lady', name: 'BabaYaga', icon: 'assets/symbols/lady-icon.jpg' },
    { id: 'king', name: 'Koschei', icon: 'assets/symbols/king-icon.jpg' },
    { id: 'ace', name: 'Gorynych', icon: 'assets/symbols/ace-icon.jpg' },
    { id: 'wild1', name: 'Gold', icon: 'assets/symbols/wildGoldenHorseshoe-icon.jpg' },
    { id: 'wild2', name: 'Silver', icon: 'assets/symbols/wildSilverHorseshoe-icon.jpg' },
  ];

  reels: SymbolItem[][] = [];

  constructor() {
    this.initReels();
  }

  ngAfterViewInit(): void {
    const reelElements = this.reelsContainer.nativeElement.querySelectorAll<HTMLElement>(
      '.slot-machine__reel-inner'
    );

    reelElements.forEach(reel => {
      gsap.set(reel, { y: 0 });
    });
  }

  private initReels(): void {
    const reelLength = this.symbols.length * 20; // запас для прокрутки
    this.reels = Array.from({ length: this.REELS_COUNT }, () =>
      Array.from({ length: reelLength }, () => this.getRandomSymbol())
    );
  }

  spinAllReels(): void {
    if (this.isSpinning) return;

    this.isSpinning = true;
    const reelElements = this.reelsContainer.nativeElement.querySelectorAll<HTMLElement>(
      '.slot-machine__reel-inner'
    );

    let finishedReels = 0;

    reelElements.forEach((reelEl, index) => {
      const stopIndex = this.getRandomStopIndex(this.reels[index]);
      const extraSpins = Math.floor(Math.random() * 10) * this.VISIBLE_SYMBOLS; // тоже кратно 3
      const finalIndex = stopIndex + extraSpins;
      const finalY = -finalIndex * this.SYMBOL_HEIGHT;

      gsap.to(reelEl, {
        y: finalY,
        duration: 2.5 + index * 0.3,
        ease: 'power2.out',
        onComplete: () => {
          // выравниваем по сетке
          gsap.set(reelEl, { y: -stopIndex * this.SYMBOL_HEIGHT });

          // пересобираем ленту для будущего бэка
          this.reels[index] = [
            ...this.reels[index].slice(stopIndex, stopIndex + this.VISIBLE_SYMBOLS),
            ...this.reels[index].filter((_, i) => i < stopIndex || i >= stopIndex + this.VISIBLE_SYMBOLS)
          ];

          finishedReels++;
          if (finishedReels === reelElements.length) this.isSpinning = false;
        }
      });
    });
  }

  private getRandomStopIndex(reel: SymbolItem[]): number {
    const step = this.VISIBLE_SYMBOLS; // 3
    const maxIndex = reel.length - step;
    const maxStepIndex = Math.floor(maxIndex / step);
    return Math.floor(Math.random() * maxStepIndex) * step;
}

  private getRandomSymbol(): SymbolItem {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
