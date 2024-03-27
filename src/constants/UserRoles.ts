import { Role} from "../models/Role";
export const UserRoles = {
    CLIENT: { id: 1, role_name: "client" } as Role,
    ARTIST: { id: 2, role_name: "artist" } as Role,
    SUPER_ADMIN: { id: 3, role_name: "super_admin" } as Role,
 };