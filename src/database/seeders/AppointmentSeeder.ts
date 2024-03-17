
import { Seeder } from "./Seeder"; 
import { UserArtist } from "../../constants/UserArtist";
import {  AppointmentRepository } from "../../data-access/repositories";
import { SeederConfig } from "../../config/seeders";
import { ArtistFactory } from "../factories/ArtistFactory";
import { User } from "../../models/User";
import { Artist } from "../../models/Artist";
import { UserFactory } from "../factories/UserFactory";
import { getRandomValueFromArray } from "../../helpers/commons";



export class AppointmentSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const {USERS,SERVICE_TATTOO} = SeederConfig;
        const artists= await Artist.find()
     
        const appointments= new ArtistFactory().createMany(USERS)
        appointments.forEach((appointment) => {
         appointment.users = getRandomValueFromArray(artists);
        
        });
       
        

              
      
        await AppointmentRepository.save(appointments); };
} 