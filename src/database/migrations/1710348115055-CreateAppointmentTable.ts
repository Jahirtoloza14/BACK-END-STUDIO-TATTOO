import { MigrationInterface, QueryRunner, Table,TableUnique  } from "typeorm";

export class CreateAppointmentTable1710348115055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner, ): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointment",
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
                        name: "shedule_id",
                        type: "int",
                    }, {
                        name: "artist_id",
                        type: "int",
                    },
                    {
                        name: "tattoo_id",
                        type: "int",
                        
                       
                       
                    },
                    {
                        name: "piercing_id",
                        type: "int",
                        
                      
                 
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                    },
                    {
                        columnNames: ["shedule_id"],
                        referencedTableName: "shedule",
                        referencedColumnNames: ["id"],
                    },
                    {
                        columnNames: ["artist_id"],
                        referencedTableName: "artists",
                        referencedColumnNames: ["id"],
                    },
                    {
                        columnNames: ["tattoo_id"],
                        referencedTableName: "services",
                        referencedColumnNames: ["id"],
                    },
                    {
                        columnNames: ["piercing_id"],
                        referencedTableName: "services",
                        referencedColumnNames: ["id"],
                    },
                  
                ],
                uniques: [
                    new TableUnique({
                       name: "user_appointment_service_unique",
                       columnNames: ["user_id", "shedule_id", "artist_id", "tattoo_id","piercing_id"],
                    }),
                 ],
            }),
            true
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointment");
    }

}
