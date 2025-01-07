import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/create-user.command';
import { GetUserInfoQuery } from './query/get-user-info.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService:AuthService,
    private commandBus: CommandBus,
    private queryBus:QueryBus
  ) {}

  // @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() dto: CreateUserDto):Promise<void> {
    const { name, email, password } = dto;
    const command = new CreateUserCommand(name, email, password);
    // await this.usersService.createUser(name, email, password);
    return this.commandBus.execute(command)
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
    const getUserInfoQuery = new GetUserInfoQuery(userId)
    return this.queryBus.execute(getUserInfoQuery)
  }
}
