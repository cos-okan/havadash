export interface LoginResponse {
  userId: number;
  email: string;
  username: string;
  token: string;
  expiresIn: number;
}
