import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
import { User } from "./User";
import { Artist } from "./Artist";
import { Shedule } from "./Shedule";


@Entity("services")
export class Service extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ name: "id_tattoo"})
    idTattoo!: number

    @Column({ name: "id_piercing"})
    idPiercing!: number

    @ManyToMany (() => Appointment, (appointment)=> appointment.services)
    appointments! : Appointment;

    @ManyToMany(() => User, (user) => user.appointments)
    users!: User[];

    @ManyToMany(() => Artist, (artist) => artist.appointments)
    artists!: Artist[];

    @ManyToMany(() => Shedule, (shedule) => shedule.appointments)
    shedule!: Shedule[];

 

}
