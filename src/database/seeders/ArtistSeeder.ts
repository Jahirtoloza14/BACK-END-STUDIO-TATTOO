import { SeederConfig } from "../../config/seeders";
import { ArtistFactory } from "../factories/ArtistFactory";
import { Seeder } from "./Seeder";
import { Artist } from "../../models/Artist";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/commons";


export class ArtistSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { ARTISTS } = SeederConfig;

        const users = await User.find(
            {
                where: {
                    role: {
                        id: 3
                    }
                }
            }
        );
        const artists = new ArtistFactory().createMany(ARTISTS);
        artists.forEach(artist => {
            artist.user = getRandomValueFromArray(users)
        })
        await Artist.save(artists);
    }
}