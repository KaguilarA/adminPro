import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  get currentTheme(): string {
    const currentTheme: string = localStorage.getItem(`themeId`);
    return currentTheme
  }

  get currentStyleLink(): string {
    const url: string = `./assets/css/colors/${this.currentTheme}.css`;
    return url
  }

  get styleElemet() {
    const styleElemet = document.getElementById(`theme`);
    return styleElemet
  }

  constructor() {
    let savedTheme = localStorage.getItem(`themeId`);
    if (!savedTheme) {
      savedTheme = `default`;
    }
    this.updateCurrentThemeId(savedTheme);
  }

  updateCurrentThemeId(themeId) {
    localStorage.setItem(`themeId`, themeId);
  }
}
