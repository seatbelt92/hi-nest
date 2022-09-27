import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserEntity } from 'entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<UserEntity[]> {
    const result = await this.usersService.getAll();
    return result;
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<void> {
    const { name, email, password } = user;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/login')
  async login(@Body() user: UserLoginDto): Promise<string> {
    const { email, password } = user;
    return await this.usersService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(
    @Param('id', ParseIntPipe) userId: string,
  ): Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }
}
