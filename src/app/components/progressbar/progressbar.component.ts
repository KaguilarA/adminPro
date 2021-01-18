import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent {

  @Input() background: string = `bg-primary`;
  @Input() progress: number = 0;

  @Output('value') outValue: EventEmitter<number> = new EventEmitter();

  get percentage() {
    return `${this.progress}%`
  }

}
