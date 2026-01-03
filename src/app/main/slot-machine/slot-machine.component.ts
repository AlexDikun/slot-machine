import { Component } from '@angular/core';

@Component({
  selector: 'app-slot-machine',
  standalone: false,
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss']
})
export class SlotMachineComponent {
  spin() {
    console.log("Спин!");
  }
}
