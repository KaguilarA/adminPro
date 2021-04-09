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

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica' } },
      { path: 'settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Tema' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'rxjs' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },

      // Maintenance

      { path: 'users', component: UsersComponent, data: { title: 'Mantenimiento de Usuarios' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento de Doctores' } }
    ]
  }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


