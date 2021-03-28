export class User {
  public _id: string;
  public firstName: string;
  public firstSurname: string;
  public email: string;
  public role: string;
  public img: string;
  public googleTokenLogin: boolean;

  public secondName?: string;
  public secondSurname?: string;

  constructor(initData) {
    this._id = initData._id;
    this.firstName = initData.firstName;
    this.firstSurname = initData.firstSurname;
    this.email = initData.email;
    this.role = initData.role;
    this.img = initData.img;
    this.secondName = initData.secondName || '';
    this.secondSurname = initData.secondSurname || '';
    this.googleTokenLogin = initData.googleTokenLogin || false;
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

  updateData(newData) {
    for (const attr in newData) {
      if (Object.prototype.hasOwnProperty.call(this, attr)) {
        const currentData = newData[attr];
        this[attr] = currentData;
      }
    }
  }
}