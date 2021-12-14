export interface AuthDataInput {
  access_token: string;
  refresh_token: string;
}

export interface UserCredentialsInput {
  email: string;
  password: string;
  profilePictureUrl?: string;
}

export interface CurrentUserData {
  email: string;
}
