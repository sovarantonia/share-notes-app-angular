import { UserInfo } from './user/user-info';

export interface UserCardItem {
  id: number;
  user: UserInfo;
  sentAt?: string;
}
