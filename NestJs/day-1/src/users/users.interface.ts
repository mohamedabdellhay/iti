export interface IUsers {
  id: string;
  username: string;
  email: string;
  password: string;
  age?: number;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  age?: number;
}

export interface ICreateUserResponse {
  message: string;
  data: IUsers;
}
