import { Service } from "../../models/Service";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

export class ServiceFactory extends Factory<Service>{
     protected generate() {
        return {
            idPiercing : faker.number.int(),
            idTattoo : faker.number. int(),

        }as Service;
    }
}