import { UserInfo } from 'src/users/UserInfo';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly config;
    constructor(config: ConfigService);
    login(user: UserInfo): Promise<string>;
    verify(jwtString: string): {
        userId: string;
        email: string;
    };
}
