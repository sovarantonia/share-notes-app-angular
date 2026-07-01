import { NoteResponse } from '../note/note-response';
import { UserInfo } from '../user/user-info';

export interface ShareResponse {
  id: number;
  sender: UserInfo;
  receiver: UserInfo;
  sentNote: NoteResponse;
  sentAt: string;
}
