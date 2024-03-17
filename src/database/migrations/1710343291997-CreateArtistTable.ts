import { MigrationInterface, QueryRunner,Table } from "typeorm";

export class CreateArtistTable1710343291997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
   
        await queryRunner.createTable(
            new Table({
                name: "artists",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "fist_name",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "255",
                    },
                    
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("artists");
    }

}
