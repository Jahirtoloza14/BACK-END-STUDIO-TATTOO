import { Seeder } from "./Seeder";
import { Role } from "../../models/Role";
import { UserRoles } from "../../constants/UserRoles";

export class RoleSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const roles: Partial<Role>[] = [
            UserRoles.ADMIN,
            UserRoles.ARTIST,
            UserRoles.CLIENT
        ];
        await Role.save(roles);
    }
}