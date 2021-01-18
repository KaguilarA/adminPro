import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  get menuItems() { 
    const items = this.sidebarService.menu;
    return items;
  }

  ngOnInit(): void {

  }


}
