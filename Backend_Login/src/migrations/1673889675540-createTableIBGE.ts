import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableIBGE1673889675540 implements MigrationInterface {
    name = 'createTableIBGE1673889675540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ibge" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_172e0d9cd261f08937b68342321" UNIQUE ("id"), CONSTRAINT "UQ_8e0bb01ad2949a1ae5c621c423f" UNIQUE ("name"), CONSTRAINT "PK_0f40159625dc3bee4812a53bd5c" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ibge"`);
    }

}
