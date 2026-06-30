import { UserResponse } from './user/user-response';

export interface UserCardItem {
  id: number;
  user: UserResponse;
  sentAt?: string;
}
