import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IncreasingComponent } from "./increasing/increasing.component";
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ChartComponent } from './chart/chart.component';
import { ModalsImageComponent } from './modals-image/modals-image.component';
import { ModalHospitalComponent } from './modal-hospital/modal-hospital.component';
import { ModalDoctorComponent } from './modal-doctor/modal-doctor.component';

@NgModule({
  declarations: [
    IncreasingComponent,
    ProgressbarComponent,
    ChartComponent,
    ModalsImageComponent,
    ModalHospitalComponent,
    ModalDoctorComponent
  ],
  exports: [
    IncreasingComponent,
    ProgressbarComponent,
    ChartComponent,
    ModalsImageComponent,
    ModalHospitalComponent,
    ModalDoctorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
