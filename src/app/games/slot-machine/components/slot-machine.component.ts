// src/app/games/slot-machine/components/slot-machine.component.ts
import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { SlotMachineEngineService } from '../services/slot-machine-engine.service';
import { SlotMachineStateService } from '../services/slot-machine-state.service';
import { ReelAnimationService } from '../services/reel-animation.service';
import { SLOT_MACHINE_CONFIG } from '../config/slot-machine.config';
import { ReelViewModel } from '../models/reel-view.model';
import { SLOT_MACHINE_BETS } from '../config';

@Component({
  selector: 'app-slot-machine',
  standalone: false,
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss'],
})
export class SlotMachineComponent {
  @ViewChildren('reelInner') reelsElements!: QueryList<ElementRef<HTMLDivElement>>;

  reels: ReelViewModel[] = [];
  showBetOptions = false;
  bets = SLOT_MACHINE_BETS;

  constructor(
    private engine: SlotMachineEngineService,
    private state: SlotMachineStateService,
    private animation: ReelAnimationService,
  ) {}

  get isSpinning$() { return this.state.isSpinning$; }
  get currentBet$() { return this.state.currentBet$; }
  get goldProgress$() { return this.state.goldScatterProgress$; }
  get silverProgress$() { return this.state.silverScatterProgress$; }

  ngOnInit() {
    this.reels = this.engine.initReels();
  }

  startSpin() {
    if (this.state.isSpinning$.value) return;

    const { reels, Finish } = this.engine.spin();
    this.reels = reels;

    let completed = 0;
    const total = reels.length;

    setTimeout(() => {
      this.reelsElements.forEach((reelInnerEl, index) => {
        const reel = reels[index];

        this.animation.resetPosition(
          reelInnerEl.nativeElement,
          0,
          SLOT_MACHINE_CONFIG.SYMBOL_HEIGHT
        );

        this.animation.spinReel(
          reelInnerEl.nativeElement,
          reel.stopIndex,
          SLOT_MACHINE_CONFIG.SYMBOL_HEIGHT,
          SLOT_MACHINE_CONFIG.SPIN_BASE_DURATION,
          () => {
            completed++;
            if (completed == total) {
              const win = Finish();
              console.log('Spin finished, win =', win);
            }
          }
        );
      });
    });
  }

  selectBet(bet: number) {
    if(this.state.isSpinning$.value) return;

    this.state.setBet(bet);
    this.showBetOptions = false;
  }

  closeBetOptions() {
    this.showBetOptions = false;
  }

  onBetClick(event: MouseEvent) {
    if(this.state.isSpinning$.value) return;

    event.stopPropagation();
    this.showBetOptions = !this.showBetOptions;
  } 
}

