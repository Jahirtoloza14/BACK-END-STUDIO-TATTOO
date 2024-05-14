import {  Entity,  PrimaryGeneratedColumn, OneToMany, Column,OneToOne, ManyToMany,ManyToOne,JoinColumn, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
import { Role } from "./Role";
import { Artist } from "./Artist";

@Entity('user')
export class User extends BaseEntity {
@PrimaryGeneratedColumn()
id!: number

@Column({ name: "first_name"})
first_name!: string 

@Column({ name: "last_name" })
last_name!: string;

@Column({ name: "email" })
email!: string

@Column({ name: "password" })
password!: string

@Column({ name: "role_name" })
role_name!: string



@ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_name" })
  role!: Role;
  @OneToOne(() => Artist, (artists) => artists.user)
  artist?: Artist;


@OneToMany (() => Appointment, (appointment)=> appointment.user_id)
appointments! : Appointment[];


}
