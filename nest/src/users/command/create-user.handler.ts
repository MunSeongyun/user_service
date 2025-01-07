import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { UsersService } from "../users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { ulid } from 'ulid';
import * as uuid from 'uuid';
import { UserCreatedEvent } from "../event/user-created.event";
import { TestEvent } from "../event/test.event";

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand>{
    constructor(
        private readonly us:UsersService,
        private eventBus: EventBus,
        private ds:DataSource,
        @InjectRepository(User) private userRepo:Repository<User>
    ){}
    async execute(command: CreateUserCommand): Promise<any> {

        const { name, email, password } = command;

        const userExist = await this.checkUserExists(email);
        if (userExist) {
          throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.');
        }
    
        const signupVerifyToken = uuid.v1();
    
        await this.saveUserUsingTransaction(name, email, password, signupVerifyToken);
    
        this.eventBus.publish(new UserCreatedEvent(email, signupVerifyToken));
        this.eventBus.publish(new TestEvent());
    }
    private async checkUserExists(email:string){
        const user = await this.userRepo.findOne({
            where:{email}
        })
        if(!user){
            return false
        }
        return true
    }
    private async saveUserUsingTransaction(name: string, email: string, password: string, signupVerifyToken: string) {
        await this.ds.transaction(async manager => {
          const user = new User();
          user.id = ulid();
          user.name = name;
          user.email = email;
          user.password = password;
          user.signupVerifyToken = signupVerifyToken;
    
          await manager.save(user);
        })
      }
}