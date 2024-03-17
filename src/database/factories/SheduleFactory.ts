import { Shedule } from "../../models/Shedule";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

export class SheduleFactory extends Factory<Shedule>{
     protected generate() {
        return {
            dateAvaible: faker.date.anytime(),
        

        }as Shedule;
    }
}