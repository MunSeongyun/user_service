export declare class EmailService {
    private transporter;
    constructor();
    sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string): Promise<any>;
}
