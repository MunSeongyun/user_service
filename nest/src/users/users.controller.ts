import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService:AuthService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() dto: CreateUserDto):Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }
  

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto):Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto):Promise<string> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(@Headers() headers, @Param('id') userId: string):Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }
}
