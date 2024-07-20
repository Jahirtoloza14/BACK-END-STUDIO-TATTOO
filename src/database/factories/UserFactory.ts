import { faker } from "@faker-js/faker";
import {User} from "../../models/User"
import { Factory } from "./Factory";
import bcrypt from 'bcrypt';
import { RoleSeeder } from "../seeders/RoleSeeder";
import { UserSeeder } from "../seeders/UserSeeder";

export class userFactory extends Factory<User>{
    protected generate():User{
        return {

            
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('123456789', 10),
            
        } as User
    }
}