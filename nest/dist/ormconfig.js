"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'user_service',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: false
});
//# sourceMappingURL=ormconfig.js.map