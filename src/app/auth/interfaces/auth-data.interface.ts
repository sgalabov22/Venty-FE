export interface AuthDataInput {
  access_token: string;
  refresh_token: string;
}

export interface UserCredentialsInput {
  email: string;
  password: string;
  fullname?: string;
  profile_picture?: File;
}

export interface CurrentUserData {
  email: string;
  fullname: string;
  profile_picture: string;
}
