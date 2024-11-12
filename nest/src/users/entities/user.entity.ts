import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn({length:100})
  id: string;


  @Column({length:30})
  name:string

  @Column({length:60})
  email:string

  @Column({length:30})
  password:string

  @Column({length:60})
  signupVerifyToken:string

}
