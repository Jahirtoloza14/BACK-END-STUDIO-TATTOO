import { Artist } from "../../models/Artist";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class ArtistFactory extends Factory<Artist>{
    protected generate():Artist{
        return{
           porfolio: faker.helpers.arrayElement([
                "tattoo realism",
                "piercing",
                
            ]),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
           
            
        } as Artist;
    }
}