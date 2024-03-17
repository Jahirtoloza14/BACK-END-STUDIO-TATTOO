import ArtistSeeder from "./ArtistSeeder.1";
import { UserSeeder } from "./UserSeeder";
import { AppointmentSeeder } from "./AppointmentSeeder";

(async ()=>{
    console.log( "Straring seeders...");


    await new AppointmentSeeder().start()
    await new UserSeeder().start()
    await new ArtistSeeder().start()





})()