import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({length:30})
  name:string

  @Column()
  type:string
}
