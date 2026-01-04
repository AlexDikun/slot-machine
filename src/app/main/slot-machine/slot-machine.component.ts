import { Component } from '@angular/core';

@Component({
  selector: 'app-slot-machine',
  standalone: false,
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss']
})
export class SlotMachineComponent {
  symbols = ['🍒', '🍋', '🔥', '💎', '7', '🍀'];
  reels = [
    ['🍒', '🍋', '🔥'],
    ['💎', '7', '🍀'],
    ['🍒', '🍋', '🔥']
  ];
  spin() {
    // Перемешиваем символы
    this.reels = this.reels.map(reel =>
      reel.map(() => this.symbols[Math.floor(Math.random() * this.symbols.length)])
    );
    // Добавляем класс для анимации
    const reels = document.querySelectorAll('.slot-machine__reel');
    reels.forEach(reel => {
      reel.classList.add('slot-machine__reel--spinning');
      setTimeout(() => {
        reel.classList.remove('slot-machine__reel--spinning');
      }, 500);
    });
  }
}
