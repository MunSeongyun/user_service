import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type:'mysql',
    host:'db',
    port:3306,
    username:'root',
    password:'1234',
    database:'user_service',
    entities:[__dirname+'/**/*.entity{.ts,.js}'],
    synchronize:true,
    migrations:[__dirname+'/**/migrations/*{.ts,.js}'],
    migrationsTableName:'migrations',
    migrationsRun:false
})