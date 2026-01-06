import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

interface Symbol {
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
  @ViewChild('reelsContainer') reelsContainer!: ElementRef;

  symbols: Symbol[] = [
    { id: 'six', name: 'Crow', icon: 'assets/symbols/six-icon.jpg'},
    { id: 'seven', name: 'Basileus', icon: 'assets/symbols/seven-icon.jpg'},
    { id: 'eight', name: 'Solovey', icon: 'assets/symbols/eight-icon.jpg'},
    { id: 'nine', name: 'Felicita', icon: 'assets/symbols/nine-icon.jpg'},
    { id: 'ten', name: 'Tugarin', icon: 'assets/symbols/ten-icon.jpg'},
    { id: 'jack', name: 'Kalyvan', icon: 'assets/symbols/jack-icon.jpg'},
    { id: 'lady', name: 'BabaYaga', icon: 'assets/symbols/lady-icon.jpg'},
    { id: 'king', name: 'Koschei', icon: 'assets/symbols/king-icon.jpg'},
    { id: 'ace', name: 'Gorynych', icon: 'assets/symbols/ace-icon.jpg'},
    { id: 'wild1', name: 'Gold', icon: 'assets/symbols/wildGoldenHorseshoe-icon.jpg'},
    { id: 'wild2', name: 'Silver', icon: 'assets/symbols/wildSilverHorseshoe-icon.jpg'},
  ];
  reels: Symbol[][] = [
    Array(5).fill(null).map(() => this.symbols[Math.floor(Math.random() * this.symbols.length)]),
    Array(5).fill(null).map(() => this.symbols[Math.floor(Math.random() * this.symbols.length)]),
    Array(5).fill(null).map(() => this.symbols[Math.floor(Math.random() * this.symbols.length)]),
  ];

  //код алисы
  reelSymbols: Symbol[] = [];
  isSpinning = false;
  ngOnInit() {
    this.reelSymbols = this.generateReelSymbols(); // инит - создаем бесконечную ленту
  }
  private generateReelSymbols(): Symbol[] { // берем базовые символы и дублируем 5 раз
    const baseSymbols = this.symbols;
    return [...baseSymbols, ...baseSymbols, ...baseSymbols, ...baseSymbols, ...baseSymbols]
  }
  spinReel(reelElement:HTMLElement, stopSymbolIndex: number) { // запуск вращения
    if (this.isSpinning) return;

    this.isSpinning = true;

    const symbolHeight = 60; // Из SCSS (.slot-machine__symbol height)
    const visibleHeight = 200; // Из SCSS (.slot-machine__reels height)
    const totalSymbols = this.reelSymbols.length;

    /// 1. Расчёт базовой позиции (символ по центру)
    const stopPosition = (stopSymbolIndex * symbolHeight) - (visibleHeight / 2);

    // 2. Ограничение по границам (не выше 0, не ниже -totalHeight)
    const maxY = -(totalSymbols * symbolHeight);
    const minY = 0;
    const finalPosition = Math.max(stopPosition + maxY, maxY);

    console.log('Выводим в лог все переменные перед gsap.to():');
    console.log({
      stopSymbolIndex,
      symbolHeight,
      visibleHeight,
      totalSymbols,
      stopPosition,
      maxY,
      minY,
      finalPosition
    });
    
    // 3. Анимация с корректной позицией
    gsap.set(reelElement, { y: 0 });
    gsap.to(reelElement, {
      y: finalPosition, // используем финальную позицию а не промежуточную
      duration: 3, // длительность прокрутки (сек)
      ease:'power1.inOut', // кривая ускорения/замедления
      onComplete: () => {
        this.isSpinning = false; 
        reelElement.style.transform = `translateY(${finalPosition}px)`;
        console.log('isSpinning после анимации:', this.isSpinning);
      }
    });
  }

  spinAllReels() {
    const reels = this.reelsContainer.nativeElement.querySelectorAll('.slot-machine__row');
    const tl = gsap.timeline();

    reels.forEach((reel: HTMLElement, index: number) => {
      const stopIndex = this.getRandomStopIndex();
      const delay = index * 0.3; // Задержка для последовательного старта

      // Расчёт финальной позиции барабана
      const finalPosition = this.calculateFinalPosition(stopIndex);

      tl.to(reel, {
        y: finalPosition,
        duration: 3,
        ease: 'power1.inOut',
        delay: delay,
        onComplete: () => {
          this.isSpinning = false;
          // Фиксируем финальную позицию через CSS-трансформацию
          reel.style.transform = `translateY(${finalPosition}px)`;
          console.log('isSpinning после анимации:', this.isSpinning);
        }
      });
  });

  tl.play(); // Запуск анимации
}

// Метод для расчёта финальной позиции барабана
private calculateFinalPosition(stopSymbolIndex: number): number {
  const symbolHeight = 60; // Высота одного символа (из SCSS)
  const visibleHeight = 200; // Высота видимой области барабана (из SCSS)
  const totalSymbols = this.reelSymbols.length; // Общее количество символов в ленте
  
  // Базовая позиция: центр символа в видимой зоне
  const stopPosition = (stopSymbolIndex * symbolHeight) - (visibleHeight / 2);
  
  // Ограничение по границам:
  // - не выше 0 (верхняя граница)
  // - не ниже maxY (нижняя граница)
  const maxY = -(totalSymbols * symbolHeight);
  let finalPosition = Math.min(stopPosition, 0); // Ограничиваем сверху
  finalPosition = Math.max(finalPosition, maxY); // Ограничиваем снизу
  
  return finalPosition;
}

  // функция-заглушка логики расчета выигрышей
  private getRandomStopIndex(): number {
    const totalSymbols = this.reelSymbols.length;
    const visibleSymbols = 3; // В видимой зоне 3 символа (верх, центр, низ)
    const minIndex = 1; // не брать самый верхний символ
    const maxIndex = totalSymbols - visibleSymbols; // не брать самые нижние
    console.log('[getRandomStopIndex] maxIndex:', maxIndex);

    return Math.floor(Math.random()* (maxIndex - minIndex + 1)) + minIndex;
  }
  //код алисы

  ngAfterViewInit() {
    // Убедимся, что reelsContainer загружен
    console.log('reelsContainer готов:', this.reelsContainer);
    // Вызывайте spinAllReels() только после готовности reelsContainer
    this.spinAllReels();
  }


  /* Пока неиспользуемый код
  spin() {
    // Логика прокрутки с GSAP
    const reels = this.reelsContainer.nativeElement.querySelectorAll('.slot-machine__row');
    reels.forEach((reel: HTMLElement, index: number) => {
      gsap.to(reel, {
        y: -1000, // Прокрутка вверх
        duration: 2 + index * 0.5, // Разная длительность для каждого барабана
        ease: "power2.inOut",
        onComplete: () => {
          // Обновляем символы после анимации
          this.reels = this.reels.map(reel =>
            reel.map(() => this.symbols[Math.floor(Math.random() * this.symbols.length)])
          );
          gsap.set(reel, { y: 0 }); // Сбрасываем позицию
        }
      });
    });
  } */
}




