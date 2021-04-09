export class Role {
  public _id: string;
  public authentication: string[];
  public id: number;
  public name: string;

  constructor(initData) {
    this._id = initData._id;
    this.authentication = initData.vauthentication
    this.id = initData.id;
    this.name = initData.name;
  }
}