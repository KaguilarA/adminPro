import { Component, Input } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  @Input('type') chartType: ChartType = 'bar';
  @Input() title: string = 'Gráfica';
  @Input() colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ]
  @Input() labels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input() data: MultiDataSet = [
    [25, 15, 10]
  ];

  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
