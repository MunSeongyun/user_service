import { Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { query } from 'express';

@Injectable()
export class UsersService {

  constructor(private emailService: EmailService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async createUser(name:string, email:string, password:string) {
    const userExist = await this.checkUserExists(email);

    if(userExist){
      throw new UnprocessableEntityException('해당 이메일로 가입할 수는 없습니다.')
    }

    const signupVerifyToken = uuid.v1();

    //await this.saveUser(name,email,password,signupVerifyToken);
    await this.saveUserUsingQueryRunner(name,email,password,signupVerifyToken)
    //await this.saveUserUsingTransaction(name,email,password,signupVerifyToken)
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(email:string) {
    const user = await this.usersRepository.findOne({
      where: {email: email}
    })
    if(user){
      return true
    }else{
      false
    }
  }

  private async saveUser(name:string, email:string, password:string, signupVerifyToken:string) {
    
    const user = new User()
    user.id = ulid()
    user.name = name;
    user.email = email
    user.signupVerifyToken = signupVerifyToken
    await this.usersRepository.save(user)
  }

  private async sendMemberJoinEmail(email:string, signupVerifyToken:string) {
    await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken:string):Promise<string> {
    throw new Error('Method not implemented.');
  }

  async login(email:string, password:string):Promise<string> {
    throw new Error('Method not implemented.');
  }

  async getUserInfo(userId:string):Promise<UserInfo> {
    throw new Error('Method not implemented.');
  }

  async saveUserUsingQueryRunner(name:string, email:string, password:string, signupVerifyToken:string){
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
      const user = new User();
      user.id = ulid()
      user.name = name;
      user.email = email
      user.password = password
      user.signupVerifyToken = signupVerifyToken
      await queryRunner.manager.save(user)

      throw new InternalServerErrorException();

      await queryRunner.commitTransaction()
    }catch(e){
      await queryRunner.rollbackTransaction()
    }finally{
      await queryRunner.release()
    }
  }
  async saveUserUsingTransaction(name:string, email:string, password:string, signupVerifyToken:string){
    await this.dataSource.transaction(async manger=>{
      const user = new User()
      user.id = ulid()
      user.name = name
      user.email = email
      user.password = password
      user.signupVerifyToken = signupVerifyToken
      await manger.save(user)

      //throw new InternalServerErrorException();
    })
  }
}
