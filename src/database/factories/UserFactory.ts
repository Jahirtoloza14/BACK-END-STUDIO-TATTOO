import { faker } from "@faker-js/faker";
import { User } from "../../models/User";
import { Factory } from "./Factory";
import bcrypt from 'bcrypt';

export class UserFactory extends Factory<User>{
    
    protected generate(): User {
        return {
            id: faker.number.int(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync("123456", 10)

        } as User;
    }

}