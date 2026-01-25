// src/app/games/slot-machine/slot-machine.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotMachineComponent } from './components/slot-machine.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    SlotMachineComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlotMachineComponent
  ]
})
export class SlotMachineModule {}
