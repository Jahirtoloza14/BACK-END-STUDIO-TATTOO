import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
import { Artist } from "./Artist";
import { Service } from "./Service";
import { User } from "./User";

@Entity("Shedule")
export class Shedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "data_avaible" })
    dateAvaible!: Date

    @OneToMany(() => Appointment, (appointment) => appointment.shedule)
    appointments!: Appointment;

    @ManyToMany(() => User, (user) => user.appointments)
    users!: User[];

    @ManyToMany(() => Artist, (artist) => artist.appointments)
    artists!: Artist[];

    @ManyToMany(() => Service, (tattoo) => tattoo.appointments)
    tattoo!: Service[];

    @ManyToMany(() => Service, (piercing) => piercing.appointments)
    piercing!: Service[];
}
