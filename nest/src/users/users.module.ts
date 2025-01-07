import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './command/create-user.handler';
import { UserEventsHandler } from './event/user-events.handler';
@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([User]), AuthModule, CqrsModule],
  controllers: [UsersController],
  providers: [UsersService, CreateUserHandler, UserEventsHandler],
})
export class UsersModule {}
