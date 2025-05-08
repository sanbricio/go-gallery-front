export interface User {
  username: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  email: string;
  name: string;
  message: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface RegisterResponse {
  username: string;
  firstname: string;
  message: string;
}

export interface UpdateUserRequest {
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
}

export interface DeleteUserRequest {
  password: string;
  code: string;
}

export interface MessageResponse {
  message: string;
}