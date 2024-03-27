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
                       { 
                        name: "tattoo",
                       type: "int",
                       length: "50",
                        
                    },
                    {
                        name: "style",
                        type: "int",
                        length: "50",
                        
                    }
                   
                    
                ],
                foreignKeys: [
                    {
                      columnNames: ["artist_id"],
                      referencedTableName: "artists",
                      referencedColumnNames: ["id"],
                    
                    },
                  ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("services");
    }

}
