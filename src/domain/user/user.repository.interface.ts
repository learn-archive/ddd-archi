import { User } from './user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  delete(id: string): Promise<void>;
}
