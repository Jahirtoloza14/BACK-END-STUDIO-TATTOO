import { Entity, PrimaryGeneratedColumn, ManyToOne,JoinColumn, ManyToMany, JoinTable, BaseEntity  } from "typeorm";
import {User} from "./User";
import { Shedule } from "./Shedule";
import { Artist } from "./Artist";
import { Service } from "./Service";


@Entity()
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn ()
    id!: number;

    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn ({ name: "user_id" })
    user!: User;

    @ManyToOne( ()=> Shedule, (schedule) => schedule.appointments)
    @JoinColumn ({ name: "schedule_id"})
    shedule!: Shedule;

    @ManyToOne( ()=> Artist, (artist) => artist.appointments)
    @JoinColumn ({ name: "artist_id"})
    artists!: Artist;


    @ManyToMany(() => Service, (service) => service.appointments)
    @JoinTable({
       name: "services", // join table name
       joinColumn: {
          name: "tattoo_id", // first column of the join table
          referencedColumnName: "id",
       },
       inverseJoinColumn: {
          name: "piercing_id", // second column of the join table
          referencedColumnName: "id",
       },
    })
    services?: Service[];
}
