import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return this.validateRequest(request)
  }
  private validateRequest(request:Request){

    const jwtString = request.headers.bearer;
    if(typeof(jwtString) ==='string'){
      this.authService.verify(jwtString)
    }else{
      throw new BadRequestException()
    }
    
    return true
  }
}
