import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [UsersModule, EmailModule, TypeOrmModule.forRoot(
    {
      type:'mysql',
      host:'db12',
      port: 3306,
      username:'root',
      password:'1234',
      database:'user_service',
      entities:[User],
      synchronize:true
    }
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
