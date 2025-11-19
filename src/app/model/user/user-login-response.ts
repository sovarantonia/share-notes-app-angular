import { UserResponse } from './user-response';

export interface UserLoginResponse {
  userResponse: UserResponse;
  tokenValue: string;
}
