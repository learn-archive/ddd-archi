import { Module } from '@nestjs/common';
import { UserService } from './application/user/user.service';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { UserController } from './interface/controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
