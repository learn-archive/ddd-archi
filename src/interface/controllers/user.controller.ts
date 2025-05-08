import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../../application/user/user.service';

class CreateUserDto {
  email: string;
  name: string;
}

class UpdateUserNameDto {
  name: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(
      createUserDto.email,
      createUserDto.name,
    );
    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      createdAt: user.getCreatedAt(),
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      createdAt: user.getCreatedAt(),
    };
  }

  @Put(':id/name')
  async updateUserName(
    @Param('id') id: string,
    @Body() updateUserNameDto: UpdateUserNameDto,
  ) {
    await this.userService.updateUserName(id, updateUserNameDto.name);
    return { message: 'User name updated successfully' };
  }
}
