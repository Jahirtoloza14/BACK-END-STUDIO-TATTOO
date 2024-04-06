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
                        default: null,
                       
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "255",
                        default: null,
                    },
                    {
                        name: "porfolio",
                        type: "varchar",
                        length: "50",
                        default: null,
                      },
                      {
                        name: "user_id",
                        type: "int",
                      },
                    
                ],
                foreignKeys: [
                    {
                      columnNames: ["user_id"],
                      referencedTableName: "users",
                      referencedColumnNames: ["id"],
                      
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
