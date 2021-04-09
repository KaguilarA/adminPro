import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '/'
        },
        {
          title: 'Progress',
          url: 'progress'
        },
        {
          title: 'Graficas',
          url: 'grafica1'
        },
        {
          title: 'Promesas',
          url: 'promises'
        },
        {
          title: 'RXJS',
          url: 'rxjs'
        }
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Usuarios',
          url: 'users'
        },
        {
          title: 'Hospitales',
          url: 'hospitals'
        },
        {
          title: 'Medicos',
          url: 'doctors'
        }
      ]
    }
  ]

  constructor() { }
}
