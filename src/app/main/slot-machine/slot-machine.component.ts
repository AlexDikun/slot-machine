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
    this.reels = this.reels.map(reel =>
      reel.map(() => this.symbols[Math.floor(Math.random() * this.symbols.length)])
    );
  }
}
