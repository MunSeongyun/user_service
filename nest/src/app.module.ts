import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { LoggerMiddleware } from './logger/logger.middleware';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('/users')
  }
}
