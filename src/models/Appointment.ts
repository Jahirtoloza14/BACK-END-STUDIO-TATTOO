import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';
import { Artist } from './Artist';

@Entity()
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    user_id!: number;

    @Column()
    artist_id!: number;

    @Column({ type: 'datetime' })
    start_time!: Date;

    @Column({ type: 'datetime' })
    end_time!: Date;

   


    @Column()
    location!: string;

    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    users!: User;

    @ManyToOne(() => Artist, (artist) => artist.appointments)
    @JoinColumn({ name: "artist_id", referencedColumnName: "id" })
    artists!: Artist;

}