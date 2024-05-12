import { Entity, Column, PrimaryGeneratedColumn, OneToMany,BaseEntity } from 'typeorm';
import { Appointment } from './Appointment';

@Entity()
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Appointment, appointment => appointment.artists)
    appointments!: Appointment[];
}