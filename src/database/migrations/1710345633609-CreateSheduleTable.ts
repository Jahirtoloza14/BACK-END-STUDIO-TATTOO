import { MigrationInterface, QueryRunner,Table } from "typeorm";

export class CreateSheduleTable1710345633609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "shedule",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "date_avaible",
                        type: "varchar",
                        length: "255",
                    },
                   
                    
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("shedule");
    }

}
