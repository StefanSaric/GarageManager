/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class InitSchema1764865815329 {
    name = 'InitSchema1764865815329'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "invoice_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying, "quantity" integer NOT NULL, "unit_price" numeric NOT NULL, "total_price" numeric NOT NULL, "invoice_id" uuid, CONSTRAINT "PK_53b99f9e0e2945e69de1a12b75a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoice_number" character varying NOT NULL, "issue_date" date NOT NULL, "total_amount" numeric NOT NULL, "status" character varying NOT NULL, "garage_id" uuid, CONSTRAINT "UQ_d8f8d3788694e1b3f96c42c36fb" UNIQUE ("invoice_number"), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "garages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying, "phone" character varying, "email" character varying, CONSTRAINT "UQ_ce8309dee0ec25a4b43dbd0ea12" UNIQUE ("email"), CONSTRAINT "PK_5aab32f702d77c87b2555553919" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying, "last_name" character varying, "email" character varying NOT NULL, "phone" character varying, "password" character varying NOT NULL, "roles" "public"."users_roles_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invoice_items" ADD CONSTRAINT "FK_dc991d555664682cfe892eea2c1" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_08349cbb7a3d9fb6b5551cac8bd" FOREIGN KEY ("garage_id") REFERENCES "garages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_08349cbb7a3d9fb6b5551cac8bd"`);
        await queryRunner.query(`ALTER TABLE "invoice_items" DROP CONSTRAINT "FK_dc991d555664682cfe892eea2c1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`DROP TABLE "garages"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TABLE "invoice_items"`);
    }
}
