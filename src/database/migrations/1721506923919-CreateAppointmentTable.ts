import {
  MigrationInterface, QueryRunner, Table
} from "typeorm";

export class CreateAppointmentTable1721506923919 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "appointment",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },

          {
            name: "title",
            type: "varchar"
          },
          {
            name: "user_id",
            type: "int"
          },

          {
            name: "artist_id",
            type: "int"
          },



          {
            name: "start_time",
            type: "datetime"
          },
          {
            name: "end_time",
            type: "datetime"
          },

          {
            name: "location",
            type: "varchar"
          }
        
        ],
        foreignKeys: [
          {
            columnNames: ["artist_id"],
            referencedTableName: "artist",
            referencedColumnNames: ["id"]
          },

          {
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],

          },

        ]
      }));
    true
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("appointment");
  }

}
