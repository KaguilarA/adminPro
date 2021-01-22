import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  items: any[];

  constructor( private sidebarService: SidebarService ) {
    this.items = sidebarService.menu;
    console.log(this.items)
  }

  ngOnInit(): void {
  }

}
