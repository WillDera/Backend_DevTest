export interface signUp {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
}

export interface UserType {
  USER: "USER";
  ADMIN: "ADMIN";
}

export type User = {
  id: number;
  role: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
};
