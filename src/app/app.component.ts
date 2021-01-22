import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adminpro';

  ngOnInit(): void {
    $(window).on("resize", () => {
      this.validateBodyClass();
    });

    this.validateBodyClass();
  }

  validateBodyClass() {
    const width: number = (globalThis.innerWidth > 0) ? globalThis.innerWidth : globalThis.screen.width;
    let height = ((globalThis.innerHeight > 0) ? globalThis.innerHeight : globalThis.screen.height) - 1;

    let topOffset = 0;
  
    if (width < 1170) {
      $(`body`).addClass(`mini-sidebar`);
      $(`.navbar-brand span`).hide();
      $(`.sidebartoggler i`).addClass(`ti-menu`);
    } else {
      $("body").removeClass("mini-sidebar");
      $('.navbar-brand span').show();
    }

    
    height = height - topOffset;
    if (height < 1)
      height = 1;
    if (height > topOffset) {
      $(".page-wrapper").css("min-height", (height) + "px");
    }
  }
}
