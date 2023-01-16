export interface IUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserCreated extends IUserRequest {
  id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
}
