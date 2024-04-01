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
                        name: "first_name",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "porfolio",
                        type: "varchar",
                        length: "50",
                      },
                      {
                        name: "user_id",
                        type: "int",
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
