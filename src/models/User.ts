import {  Entity,  PrimaryGeneratedColumn, OneToMany, Column,OneToOne, ManyToMany,ManyToOne,JoinColumn, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
import { Artist } from "./Artist";
import { Service } from "./Service";
import { Role } from "./Role";

@Entity("users")
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



@OneToOne(() => Artist, (artists) => artists.user)
artist?: Artist;



@ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role;



@OneToMany (() => Appointment, (appointment)=> appointment.user_id)
appointments! : Appointment[];


}
