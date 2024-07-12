export interface User {
    email?: string;
    age?: number;
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
    age?: number;
    gender?: string;
}

export interface UserLogin {
    password?: string;
    email?: string;
}