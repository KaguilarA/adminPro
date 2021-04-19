import { Injectable } from '@angular/core';

import { localData } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  get header() {
    const header = {
      headers: {
        'x-token': this.token
      }
    }
    return header;
  }

  get token(): string {
    const currentToken: string = sessionStorage.getItem(localData.login);
    return currentToken;
  }

  public  hasToken(): boolean {
    const currentToken: string = sessionStorage.getItem(localData.login);
    let hasToken: boolean = true;
    if (currentToken === null) {
      hasToken = false;
    }
    return hasToken;
  }

  public setLoginData(loginData: string): void {
    sessionStorage.setItem(localData.login, loginData);
  }

  public setRemindedUser(remindedUser: string): void {
    localStorage.setItem(localData.remindMe, remindedUser);
  }

  public remindedUser(): string {
    let remindedUser: string = localStorage.getItem(localData.remindMe);
    if (remindedUser === null) {
      remindedUser = '';
    }
    return remindedUser;
  }

  public resetLoginData(): void {
    sessionStorage.removeItem(localData.login);
  }

  public resetRemindedUser(): void {
    localStorage.removeItem(localData.remindMe);
  }
}
