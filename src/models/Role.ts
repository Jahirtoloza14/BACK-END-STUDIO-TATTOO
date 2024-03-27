import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role_name!: string;

 

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}