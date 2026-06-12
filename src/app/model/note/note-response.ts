import { TagResponse } from '../tag/tag-response';
import { UserResponse } from '../user/user-response';

export interface NoteResponse {
  user: UserResponse;
  id: number;
  title: string;
  text: string;
  date: string;
  grade: number;
  tags: TagResponse[];
}
