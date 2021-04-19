import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { ResultsComponent } from './results/results.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica' } },
      { path: 'settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Tema' } },
      { path: 'results/:term', component: ResultsComponent, data: { title: 'Resultados de busqueda' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'rxjs' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },

      // Maintenance

      { path: 'users', canActivate: [ AdminGuard ], component: UsersComponent, data: { title: 'Mantenimiento de usuarios' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de hospitales' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento de médicos' } }
    ]
  }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


