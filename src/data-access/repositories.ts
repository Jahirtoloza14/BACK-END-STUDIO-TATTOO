import { dataSource } from "../database/data-source";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Artist } from "../models/Artist";


export const userRepository= dataSource.getRepository(User);
export const ArtistRepository= dataSource.getRepository(Artist);
export const AppointmentRepository= dataSource.getRepository(Appointment);

