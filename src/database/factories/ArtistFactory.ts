import { Artist } from "../../models/Artist";
import { faker } from "@faker-js/faker";
import { Factory } from "./Factory";

export class ArtistFactory extends Factory<Artist> {
    protected generate(): Artist {
        return {

            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            porfolio: faker.helpers.arrayElement([
                "tattoo realism",
                "piercing",

            ]),
        } as Artist;
    }
}