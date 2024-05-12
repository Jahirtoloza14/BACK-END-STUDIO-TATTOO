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
    description!: string;

    @Column({ type: 'datetime' })
    start_time!: Date;

    @Column({ type: 'datetime' })
    end_time!: Date;

    @Column()
    user_id!: string;

    @Column()
    artist_id!: string;


    @Column()
    location!: string;

    @ManyToOne(() => User, user => user.appointments)
    users!: User;

    @ManyToOne(() => Artist, artist => artist.appointments)
    artists!: Artist;

}