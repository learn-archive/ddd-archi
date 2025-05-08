import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async save(user: User): Promise<void> {
    this.users.set(user.getId(), user);
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.getEmail() === email) {
        return user;
      }
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}
