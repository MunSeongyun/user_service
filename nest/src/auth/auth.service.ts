import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInfo } from 'src/users/UserInfo';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken'
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly config:ConfigService
  ){}
  async login(user: UserInfo):Promise<string>{
    const payload = {...user}

    return jwt.sign(payload, this.config.get('JWT_SECRET'),{
      expiresIn: '1d',
      audience: 'localhost',
      issuer:'localhost'
    })
  }
  verify(jwtString: string){
    try{
      const payload = jwt.verify(jwtString, this.config.get('JWT_SECRET')) as (jwt.JwtPayload | string) & User;
      const {id, email}= payload

      return {
        userId:id,
        email
      }
    }catch(e){
      throw new UnauthorizedException()
    }
  }
}
