import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';
import { Artist } from './Artist';

@Entity("appointment")
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

    @ManyToOne(() => User, (users) => users.id)
    @JoinColumn({ name: "user_id" })
    users!: User;

    @ManyToOne(() => Artist, (artists) => artists.id)
    @JoinColumn({ name: "artist_id" })
    artists!: Artist;

}