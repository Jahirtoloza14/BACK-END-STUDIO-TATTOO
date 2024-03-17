import {  UserFactory } from "../factories/UserFactory"
import { Seeder } from "./Seeder"
import { User } from "../../models/User"
import { Appointment } from "../../models/Appointment";
import { SeederConfig } from "../../config/seeders";
import { UserArtist } from "../../constants/UserArtist";
import { userRepository } from "../../data-access/repositories";
import { Artist } from "../../models/Artist";


export class UserSeeder extends Seeder {
    protected async generate(): Promise<void> {
      
         };
} 

