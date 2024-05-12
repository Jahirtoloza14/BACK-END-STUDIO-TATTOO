import { Role } from '../../models/Role';
import { Seeder } from './Seeder';
import { faker } from '@faker-js/faker';

export class seedRoles  extends Seeder {
    protected async generate () : Promise<void>{
    const roles: Partial<Role>[]=[

    
        { id:1, role_name: 'client' },
        { id:2, role_name: 'admin' },
        { id:3, role_name: 'artist' }
    ];

   await Role.save(roles);
}
    

   
};