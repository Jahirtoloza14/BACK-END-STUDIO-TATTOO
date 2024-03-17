import { Artist } from "../../models/Artist";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

export class ArtistFactory extends Factory<Artist>{
     protected generate() {
        return {
            firstName : faker.person.firstName(),
            lastName : faker.person.lastName(),

        }as Artist;
    }
}