import { User } from './user';

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  friends: User[];
}
