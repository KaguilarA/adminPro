import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) {}

  get stylesSelector(): Element[] {
    const styleElemet: Element[] =
      Array.from(document.getElementsByClassName(`selector`));
    return styleElemet
  }

  ngOnInit(): void {
    this.checkCurrentTheme();
  }

  changeTheme(themeId): void {
    this.settingsService.updateCurrentThemeId(themeId);
    this.settingsService.styleElemet.setAttribute(`href`,
      this.settingsService.currentStyleLink);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    for (const selector of this.stylesSelector) {
      const currentTheme = selector.getAttribute(`data-theme`);
      selector.classList.remove(`working`);
      if (this.settingsService.currentTheme === currentTheme) {
        selector.classList.add(`working`);
      }
    }
  }

}
