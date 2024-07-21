import { Column, OneToMany, PrimaryGeneratedColumn, Entity, BaseEntity, } from "typeorm";
import { User } from "./User";

@Entity("role")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;



  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}