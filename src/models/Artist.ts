import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
import { Shedule } from "./Shedule";
import { Service } from "./Service";
import { User } from "./User";

@Entity("artists")
export class Artist extends BaseEntity {
   
   
    
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ name: "first_name"})
    firstName!: string
    
    @Column({ name: "last_name" })
    lastName!: string;

    @OneToMany (() => Appointment, (appointment)=> appointment.artists)
   appointments! : Appointment[];

   @ManyToMany(() => User, (user) => user.appointments)
   users!: User[];

   @ManyToMany(() => Shedule, (shedule) => shedule.appointments)
   shedules!: Shedule[];

   @ManyToMany(() => Service, (tattoo) => tattoo.appointments)
   tattoo!: Service[];

   @ManyToMany(() => Service, (piercing) => piercing.appointments)
   piercing!: Service[];

   
   
  
}
