import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(email: string, name: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = new User(uuidv4(), email, name);
    await this.userRepository.save(user);
    return user;
  }

  async updateUserName(userId: string, newName: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.updateName(newName);
    await this.userRepository.save(user);
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
