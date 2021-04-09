import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _showModal: boolean = false;
  public data: any = {};
  public entity: "users" | "hospitals" | "doctors";

  constructor() { }

  get modalState(): boolean {
    return this._showModal;
  }

  hideModal() {
    this.data = {};
    this._showModal = false;
  }

  showModal(data, entity: "users" | "hospitals" | "doctors") {
    this.data = data;
    this.entity = entity;
    this._showModal = true;
  }
}
