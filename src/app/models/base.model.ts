export class BaseModel {
  public _id: string;
  public id: number;

  updateData(newData) {
    for (const attr in newData) {
      if (Object.prototype.hasOwnProperty.call(this, attr)) {
        const currentData = newData[attr];
        this[attr] = currentData;
      }
    }
  }
}