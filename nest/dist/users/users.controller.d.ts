import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(dto: CreateUserDto): Promise<void>;
    verifyEmail(dto: VerifyEmailDto): Promise<string>;
    login(dto: UserLoginDto): Promise<string>;
    getUserInfo(userId: string): Promise<UserInfo>;
}
