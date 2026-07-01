import { TagResponse } from '../tag/tag-response';
import { UserInfo } from '../user/user-info';

export interface NoteResponse {
  user: UserInfo;
  id: number;
  title: string;
  text: string;
  date: string;
  grade: number;
  tags: TagResponse[];
}
