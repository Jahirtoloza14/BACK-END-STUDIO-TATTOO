import { Entity, Column, PrimaryGeneratedColumn, OneToMany,BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Appointment } from './Appointment';
import { User } from './User';

@Entity()
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @OneToOne(() => User, user => user.artist)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @OneToMany(() => Appointment, (appointment) => appointment.artists)
    appointments!: Appointment[];
}