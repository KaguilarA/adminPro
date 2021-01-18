import {
  Component,
  Input,
  Output,
  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styles: []
})
export class IncreasingComponent {
  @Input() btnMinus: string = `bg-danger`;
  @Input() btnPlus: string = `bg-success`;
  @Input('value') progress: number = 70;

  @Output('value') outValue: EventEmitter<number> = new EventEmitter();

  get percentage() {
    return `${this.progress}%`
  }

  // Methods

  updateValue(newValue: number): void {
    let currentValue: number = this.progress + newValue;

    if (this.progress >= 100 && newValue >= 0) {
      currentValue = 100
    }

    if (this.progress <= 0 && newValue < 0) {
      currentValue = 0
    }

    this.progress = currentValue;
    this.outValue.emit(this.progress);
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.updateValue(this.progress);
  }

}
