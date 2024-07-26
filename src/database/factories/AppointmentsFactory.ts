import { faker } from "@faker-js/faker";
import { Appointment } from "../../models/Appointment";
import { Factory } from "./Factory";

export class AppointmentsFactory extends Factory<Appointment> {
    protected generate(): Appointment {
        return {
           
            title: faker.helpers.arrayElement([
                "tattoo",
                "piercing",

            ]),
            user_id: faker.number.int({ min: 1, max: 5 }),
            artist_id: faker.number.int({ min: 1, max: 5 }),
            start_time: faker.date.future(),
            end_time: faker.date.future(),
            location: faker.location.city(),

        } as Appointment

    }
}