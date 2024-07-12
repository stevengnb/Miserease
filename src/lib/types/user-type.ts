export interface User {
  email?: string;
  gender?: string;
  role?: string;
}

export interface UserUpdate {
  age?: number;
  gender?: string;
}

export interface UserRegister {
  password?: string;
  email?: string;
  gender?: string;
}

export interface UserLogin {
  password?: string;
  email?: string;
}
