import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { userFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";

export class UserSeeder extends Seeder {
    protected async generate(): Promise<void> {
       const { ADMINS, ARTISTS,CLIENTS } = SeederConfig;
 
       const usersFactory = new userFactory();
 
       // admins
       const adminUsers = usersFactory.createMany(ADMINS);
       adminUsers.forEach((user) => {
          user.role = UserRoles.ADMIN;
       });
 
       // artist
       const artistUsers = usersFactory.createMany(ARTISTS);
       artistUsers.forEach((user) => {
          user.role = UserRoles.ARTIST;
       });
       // clients
       const cientUsers = usersFactory.createMany(CLIENTS);
       artistUsers.forEach((user) => {
          user.role = UserRoles.CLIENT;
       });
      
       // save to database
       const allUsers = [...adminUsers, ...artistUsers, ...cientUsers];
       await User.save(allUsers);
    }
 }