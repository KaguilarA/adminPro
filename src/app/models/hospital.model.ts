import { BaseModel } from "./base.model";

export class Hospital extends BaseModel {
  public name: string;
  public img: string;
  public userCreatorId: string;
  public latitude?: number;
  public longitude?: number;

  constructor(initData) {
    super();
    this._id = initData._id;
    this.id = initData.id;
    this.name = initData.name;
    this.img = initData.img;
    this.userCreatorId = initData.userCreatorId;
    this.latitude = initData.latitude || 0;
    this.longitude = initData.longitude || 0;
  }
}