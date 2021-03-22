export class User {
  constructor(
    public _id: string,
    public firstName: string,
    public firstSurname: string,
    public email: string,
    public id: string,
    public role: string,
    public img: string,

    public secondName?: string,
    public secondSurname?: string,
    public img_id?: string,
    public googleTokenLogin?: boolean,
  ) {}
}