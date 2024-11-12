"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1731394131667 = void 0;
class CreateUserTable1731394131667 {
    constructor() {
        this.name = 'CreateUserTable1731394131667';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(100) NOT NULL, \`name\` varchar(30) NOT NULL, \`email\` varchar(60) NOT NULL, \`password\` varchar(30) NOT NULL, \`signupVerifyToken\` varchar(60) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
exports.CreateUserTable1731394131667 = CreateUserTable1731394131667;
//# sourceMappingURL=1731394131667-CreateUserTable.js.map