import { MigrationInterface, QueryRunner,Table } from "typeorm";

export class CreateServicesTable1710346397873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "services",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                       { name: "id_tattoo",
                       type: "int",
                        
                        
                    },
                    {
                        name: "id_piercing",
                        type: "int",
                        
                        
                    }
                   
                    
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("services");
    }

}
