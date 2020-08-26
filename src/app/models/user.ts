export class User {
  address: IAddress;
  company: ICompany;
  email: string;
  id: number;
  name: string;
  phone: string;
  username?: string;
  website?: string
}

export interface IAddress {
  city: string;
  geo: IGeo;
  street: string;
  suite: string;
  zipcode: string;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  bs: string;
  catchPhrase: string;
  name: string;
}
