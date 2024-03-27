import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany,OneToOne,JoinColumn, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
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


    @OneToOne(() => User, (user) => user.artist)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @OneToMany (() => Appointment, (appointment)=> appointment.artist)
   appointments! : Appointment[];

   @ManyToMany(() => User, (user) => user.appointments)
   users!: User[];



   @ManyToMany(() => Service, (tattoo) => tattoo.appointments)
   tattoo!: Service[];

   @ManyToMany(() => Service, (piercing) => piercing.appointments)
   piercing!: Service[];

   
   
  
}
