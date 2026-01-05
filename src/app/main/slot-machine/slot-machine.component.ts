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
  styleUrls: ['./slot-machine.component.scss']
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

  ngAfterViewInit() {}

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
  }
}
