import { Seeder } from "./Seeder";
import { User } from "../../models/User";
import { UserArtist } from "../../constants/UserArtist";
import { ArtistFactory } from "../factories/ArtistFactory";
import { getRandomValueFromArray } from "../../helpers/commons";
import { SeederConfig } from "../../config/seeders";
import { Appointment } from "../../models/Appointment";
import { Service } from "../../models/Service";


export default class ArtistSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const {USERS,ARTIST} = SeederConfig;
        const useres= await User.find();
        const service= await Service.find();
        
        const services = new ArtistFactory().createMany(ARTIST);
        services.forEach((artist, index) => {
            
            artist.users= useres[index];
            artist.users = getRandomValueFromArray[service]
        });





        await User.save(services);
    };
}
