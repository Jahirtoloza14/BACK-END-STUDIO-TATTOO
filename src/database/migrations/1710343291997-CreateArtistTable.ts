import { MigrationInterface, QueryRunner,Table } from "typeorm";

export class CreateArtistTable1710343291997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
   
        await queryRunner.createTable(
            new Table({
                name: "artist",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
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
                     
                    
                ],
                foreignKeys: [  
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                     
                    }]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("artist");
    }

}
