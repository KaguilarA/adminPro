import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

import { IncreasingComponent } from "./increasing/increasing.component";
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ChartComponent } from './chart/chart.component';
import { ModalsImageComponent } from './modals-image/modals-image.component';

@NgModule({
  declarations: [
    IncreasingComponent,
    ProgressbarComponent,
    ChartComponent,
    ModalsImageComponent
  ],
  exports: [
    IncreasingComponent,
    ProgressbarComponent,
    ChartComponent,
    ModalsImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
