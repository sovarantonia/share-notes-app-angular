import { User } from './user';

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  friends: User[];
}
