import { BaseModel } from "./base.model";

export class Role extends BaseModel {
  public authentication: string[];
  public name: string;

  constructor(initData) {
    super();
    this._id = initData._id;
    this.authentication = initData.vauthentication
    this.id = initData.id;
    this.name = initData.name;
  }
}