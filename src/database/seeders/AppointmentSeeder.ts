import { SeederConfig } from "../../config/seeders";
import { AppointmentsFactory } from "../factories/AppointmentsFactory";
import { Seeder } from "./Seeder";
import { Artist } from "../../models/Artist";
import { getRandomValueFromArray } from "../../helpers/commons";
import { Appointment } from "../../models/Appointment";
import { User } from "../../models/User";



export class AppointmentSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { ARTISTS } = SeederConfig;
        const { APPOINTMENTS } = SeederConfig;
        const { USERS } = SeederConfig;

        const artists = await Artist.find();
        const users = await User.find();
        const jobdates = new AppointmentsFactory().createMany(APPOINTMENTS);
        jobdates.forEach(appointment => {
            appointment.artists = getRandomValueFromArray(artists);
            appointment.users = getRandomValueFromArray(users);
        })
        await Appointment.save(jobdates);
    }
}