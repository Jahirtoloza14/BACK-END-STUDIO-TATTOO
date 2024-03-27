import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm"
import { Appointment } from "./Appointment";
import { User } from "./User";
import { Artist } from "./Artist";



@Entity("services")
export class Service extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ name: "tattoo"})
    id_tattoo!: number
  
    @Column({ name: "style"})
    style!: string

    @Column({ name: "artist_id"})
    artist_id!: number

  

    @ManyToOne(() => Artist, (artist) => artist.user)
    @JoinColumn({ name: "artist_id" })
    user!: Artist;

  

 

}
