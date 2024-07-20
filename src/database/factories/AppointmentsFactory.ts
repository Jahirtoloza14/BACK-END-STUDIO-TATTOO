import { faker } from "@faker-js/faker";
import { Appointment} from "../../models/Appointment";
import { Factory } from "./Factory";

export class AppointmentsFactory extends Factory<Appointment>{
    protected generate():Appointment{
        return{
            
            title: faker.helpers.arrayElement([
                "tattoo",
                "piercing",
                
            ]),
            
          
            user_id: faker.number.int(),
            start_time: faker.date.future(),
            end_time: faker.date.future(),
            location: faker.location.city(),
           
        } as Appointment

    }
}