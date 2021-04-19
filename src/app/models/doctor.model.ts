import { BaseModel } from "./base.model";

export class Doctor extends BaseModel {
  public firstName: string;
  public firstSurname: string;
  public img: string;
  public userCreatorId;
  public hospitalId;

  public secondName?: string;
  public secondSurname?: string;

  constructor(initData) {
    super();
    this._id = initData._id;
    this.id = initData.id;
    this.firstName = initData.firstName;
    this.firstSurname = initData.firstSurname;
    this.img = initData.img;
    this.userCreatorId = initData.userCreatorId;
    this.hospitalId = initData.hospitalId;
    this.secondName = initData.secondName || '';
    this.secondSurname = initData.secondSurname || '';
  }

  get mainName(): string {
    return `${this.firstName} ${this.firstSurname}`;
  }

  get names(): string {
    return `${this.firstName} ${this.secondName}`;
  }

  get surnames(): string {
    return `${this.firstSurname} ${this.secondSurname}`;
  }
}