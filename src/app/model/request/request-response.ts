import { UserInfo } from '../user/user-info';

export interface RequestResponse {
  id: number;
  sender: UserInfo;
  receiver: UserInfo;
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING';
  sentAt: string;
}
