import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1673890569428 implements MigrationInterface {
    name = 'createTables1673890569428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ibge" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_172e0d9cd261f08937b68342321" UNIQUE ("id"), CONSTRAINT "UQ_8e0bb01ad2949a1ae5c621c423f" UNIQUE ("name"), CONSTRAINT "PK_0f40159625dc3bee4812a53bd5c" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "quantity" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" date, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "ibge"`);
    }

}
