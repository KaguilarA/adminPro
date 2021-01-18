import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})

export class ProgressComponent {

  progress1: number = 32;
  progress2: number = 12;


  updateBarValue(value: number) {
    // progress1 = value;
    console.log(`fuck`, value);

  }
}
