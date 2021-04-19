import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: []
})
export class LoadingComponent implements OnInit {

  ngOnInit() {
    $(function () {
      $(".preloader").fadeOut();
    });
    jQuery(document).on('click', '.mega-dropdown', function (e) {
      e.stopPropagation()
    });

    var set = function () {
      var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
      var topOffset = 0;
      if (width < 1170) {
        $("body").addClass("mini-sidebar");
        $('.navbar-brand span').hide();
        $(".sidebartoggler i").addClass("ti-menu");
      } else {
        $("body").removeClass("mini-sidebar");
        $('.navbar-brand span').show();
      }

      var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
      height = height - topOffset;
      if (height < 1) height = 1;
      if (height > topOffset) {
        $(".page-wrapper").css("min-height", (height) + "px");
      }

    };

    $(window).ready(set);
    $(window).on("resize", set);

    $(".sidebartoggler").on('click', function () {
      if ($("body").hasClass("mini-sidebar")) {
        $("body").trigger("resize");
        $("body").removeClass("mini-sidebar");
        $('.navbar-brand span').show();

      } else {
        $("body").trigger("resize");
        $("body").addClass("mini-sidebar");
        $('.navbar-brand span').hide();

      }
    });

    $(".nav-toggler").click(function () {
      $("body").toggleClass("show-sidebar");
      $(".nav-toggler i").toggleClass("ti-menu");
      $(".nav-toggler i").addClass("ti-close");
    });

    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
      $(".app-search").toggle(200);
    });

    $(".right-side-toggle").click(function () {
      $(".right-sidebar").slideDown(50);
      $(".right-sidebar").toggleClass("shw-rside");
    });

    $('.floating-labels .form-control').on('focus blur', function (e) {
      // @ts-ignore
      $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    $(function () {
      // @ts-ignore
      $('[data-toggle="tooltip"]').tooltip()
    });

    $(function () {
      // @ts-ignore
      $('[data-toggle="popover"]').popover()
    });

    $(function () {
      // @ts-ignore
      $('#sidebarnav').AdminMenu();
    });

      // @ts-ignore
    $('.scroll-sidebar, .right-side-panel, .message-center, .right-sidebar').perfectScrollbar();

    $("body").trigger("resize");

    $(".list-task li label").click(function () {
      $(this).toggleClass("task-done");
    });

    $('a[data-action="collapse"]').on('click', function (e) {
      e.preventDefault();
      $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
      // @ts-ignore
      $(this).closest('.card').children('.card-body').collapse('toggle');
    });

    $('a[data-action="expand"]').on('click', function (e) {
      e.preventDefault();
      $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
      $(this).closest('.card').toggleClass('card-fullscreen');
    });

    $('a[data-action="close"]').on('click', function () {
      $(this).closest('.card').removeClass().slideUp('fast');
    });
  }
}
