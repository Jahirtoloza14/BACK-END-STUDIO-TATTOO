import {  Entity,  PrimaryGeneratedColumn, OneToMany, Column, ManyToMany, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
import { Shedule } from "./Shedule";
import { Artist } from "./Artist";
import { Service } from "./Service";

@Entity("users")
export class User extends BaseEntity {
@PrimaryGeneratedColumn()
id!: number

@Column({ name: "first_name"})
firstName!: string 

@Column({ name: "last_name" })
lastName!: string;

@Column({ name: "email" })
email!: string

@Column({ name: "password" })
password!: string




@OneToMany (() => Appointment, (appointment)=> appointment.user)
appointments! : Appointment[];

@ManyToMany (()=> Shedule, (shedule)=> shedule.appointments)
shedules!: Shedule[];

@ManyToMany (() => Artist, (artist)=> artist.appointments)
artists!: Artist[];

@ManyToMany (() => Service, (tattoo)=> tattoo.appointments)
tattoo!: Service[];

@ManyToMany (() => Service, (piercing)=> piercing.appointments)
piercing!: Service[];

}
