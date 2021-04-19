import { Injectable, EventEmitter } from '@angular/core';

type Entity = "user" | "hospital" | "doctor";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _showModal: boolean = false;
  private _showImgModal: boolean = false;
  public data: any = {};
  public entity: Entity;
  public showData: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get modalImgState(): boolean {
    return this._showImgModal;
  }

  get modalState(): boolean {
    return this._showModal;
  }

  public hideImgModal(): void {
    this._showImgModal = false;
  }

  public hideModal(): void {
    this.data = {};
    this._showModal = false;
  }

  public resetData(): void {
    this.data = {};
    this._showImgModal = false;
    this._showModal = false;
  }

  public showModal(entity: Entity, data?): void {
    this.entity = entity;
    if (data) {
      this.data = data;
    }
    this._showModal = true;
  }

  public showImgModal(entity: Entity = this.entity, data = this.data): void {
    this.data = data;
    this.entity = entity;
    this._showImgModal = true;
  }
}
