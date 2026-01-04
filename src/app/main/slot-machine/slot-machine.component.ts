import { Component } from '@angular/core';

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
export class SlotMachineComponent {
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

  spin() {
    // Добавляем класс для анимации
    const rows = document.querySelectorAll('.slot-machine__row');
    rows.forEach(row => row.classList.add('slot-machine__row--spinning'));

    // Через 500 мс обновляем символы и убираем анимацию
    setTimeout(() => {
      this.reels = this.reels.map(reel =>
        reel.map(() => this.symbols[Math.floor(Math.random() * this.symbols.length)])
      );
      rows.forEach(row => row.classList.remove('slot-machine__row--spinning'));
    }, 500);
  }
}
