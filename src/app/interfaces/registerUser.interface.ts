export interface NewUserData {
  firstName: string;
  secondName?: string;
  firstSurname: string;
  secondSurname?: string;
  email: string;
  password: string;
  password2: string;
  terms: boolean;
}