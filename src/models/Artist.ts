import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity("artist")
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column({ name: "user_id" })
    user_id!: number;

    @Column()
    porfolio!: string;

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    user!: User;

}