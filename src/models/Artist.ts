import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany,OneToOne,JoinColumn, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
import { Service } from "./Service";
import { User } from "./User";

@Entity("artists")
export class Artist extends BaseEntity {
   
   
    
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ name: "first_name"})
    first_name!: string;
    
    @Column({ name: "last_name" })
    last_name!: string;

    @Column({ name: "porfolio" })
    porfolio!: string;
   

    @OneToMany(() => Service, (design) => design)
  service!: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.artist)
  clientAppointments!: Appointment[];

  @OneToOne(() => User, (user) => user.artist)
  @JoinColumn({ name: "user_id" })
  user!: User;
   
  
}
