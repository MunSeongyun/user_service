import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
export declare class UsersService {
    private emailService;
    private usersRepository;
    private dataSource;
    constructor(emailService: EmailService, usersRepository: Repository<User>, dataSource: DataSource);
    createUser(name: string, email: string, password: string): Promise<void>;
    private checkUserExists;
    private saveUser;
    private sendMemberJoinEmail;
    verifyEmail(signupVerifyToken: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    getUserInfo(userId: string): Promise<UserInfo>;
    saveUserUsingQueryRunner(name: string, email: string, password: string, signupVerifyToken: string): Promise<void>;
    saveUserUsingTransaction(name: string, email: string, password: string, signupVerifyToken: string): Promise<void>;
}
