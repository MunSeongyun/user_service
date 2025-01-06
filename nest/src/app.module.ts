import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BatchModule } from './batch/batch.module';
import { TaskService } from './task/task.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckService } from './health-check/health-check.service';
import { DogHealthIndicator } from './health-check/dog.health';

@Module({
  imports: [UsersModule, EmailModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_SERVER,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User],
      synchronize: false,
      migrations: [__dirname + '/**/migrations/*.js'],
      migrationsTableName:'migrations'
    }),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    BatchModule,
    TerminusModule,
    HttpModule
  ],
  controllers: [HealthCheckController],
  providers: [HealthCheckService,DogHealthIndicator],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('/users')
  }
}
