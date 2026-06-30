import { UserResponse } from "../user/user-response";

export interface RequestResponse {
  id: number;
  sender: UserResponse;
  receiver: UserResponse;
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING';
  sentAt: string;
}
