import { faker } from "@faker-js/faker";
import { Appointment } from "../../models/Appointment";
import { Factory } from "./Factory";

export class AppointmentsFactory extends Factory<Appointment> {
    protected generate(): Appointment {
        return {
            id: faker.number.int({ min: 1, max: 1000 }),
            title: faker.helpers.arrayElement([
                "tattoo",
                "piercing",

            ]),
            user_id: faker.number.int({ min: 1, max: 1000 }),
            artist_id: faker.number.int({ min: 1, max: 1000 }),
            start_time: faker.date.future(),
            end_time: faker.date.future(),
            location: faker.location.city(),

        } as Appointment

    }
}