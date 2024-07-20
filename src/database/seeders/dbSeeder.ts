import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { ArtistSeeder } from "./ArtistSeeder";
import {AppointmentSeeder} from "./AppointmentSeeder"

(async () =>{
    console.log('starting seeding')
    await new RoleSeeder().start();
    await new UserSeeder().start();
    await new ArtistSeeder().start();
   await new AppointmentSeeder().start();
})()