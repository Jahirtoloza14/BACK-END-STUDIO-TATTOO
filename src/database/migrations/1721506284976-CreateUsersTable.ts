import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1721506284976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
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
                    name: "email",
                    type: "varchar",
                    length: "255",

                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "role_id",
                    type: "int",
                },],
            foreignKeys: [
                {
                    columnNames: ["role_id"],
                    referencedTableName: "role",
                    referencedColumnNames: ["id"],
                },
            ],
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
