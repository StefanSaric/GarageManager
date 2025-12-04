import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1764761371321 implements MigrationInterface {
  name = 'InitSchema1764761371321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "quantity" integer NOT NULL, "unitPrice" numeric NOT NULL, "totalPrice" numeric NOT NULL, "invoiceId" uuid, CONSTRAINT "PK_621317346abdf61295516f3cb76" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoiceNumber" character varying NOT NULL, "issueDate" date NOT NULL, "totalAmount" numeric NOT NULL, "status" character varying NOT NULL, "garageId" uuid, CONSTRAINT "UQ_d7bed97fb47876e03fd7d7c285a" UNIQUE ("invoiceNumber"), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "garage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying, "email" character varying, CONSTRAINT "UQ_db153188545fcce860dab94abb3" UNIQUE ("email"), CONSTRAINT "PK_64031c73e02f698de3556b51dd9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_item" ADD CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_4487073f0ff865edc9ccc66fda4" FOREIGN KEY ("garageId") REFERENCES "garage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_4487073f0ff865edc9ccc66fda4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_item" DROP CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead"`,
    );
    await queryRunner.query(`DROP TABLE "garage"`);
    await queryRunner.query(`DROP TABLE "invoice"`);
    await queryRunner.query(`DROP TABLE "invoice_item"`);
  }
}
