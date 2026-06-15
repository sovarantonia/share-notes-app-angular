import { UserResponse } from "../user/user-response";

export interface RequestResponse {
  id: string;
  sender: UserResponse;
  receiver: UserResponse;
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING';
  sentAt: string;
}
