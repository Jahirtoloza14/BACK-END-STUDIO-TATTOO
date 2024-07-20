import { Entity, Column, PrimaryGeneratedColumn, OneToMany,BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Appointment } from './Appointment';
import { User } from './User';

@Entity()
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

     @Column()
    porfolio!: string;

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    user!: User;

}