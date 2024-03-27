import { MigrationInterface, QueryRunner, Table,TableUnique  } from "typeorm";

export class CreateAppointmentTable1710348115055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner, ): Promise<void> {
        
            await queryRunner.createTable(
              new Table({
                name: "appointments",
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
                    name: "artist_id",
                    type: "int",
                  },
                  {
                    name: "date",
                    type: "date",
                  },
                  {
                    name: "time",
                    type: "time",
                  },
                  
                ],
                foreignKeys: [
                  {
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                
                  },
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
        await queryRunner.dropTable("appointment");
    }

}
