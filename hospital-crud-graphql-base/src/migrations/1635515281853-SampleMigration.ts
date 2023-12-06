import {MigrationInterface, QueryRunner} from "typeorm";

export class SampleMigration1635515281853 implements MigrationInterface {
    name = 'SampleMigration1635515281853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "health_plan" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "personId" integer, CONSTRAINT "PK_2de129f9ccd688a12e9bec0737d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "name" character varying, "birthDate" TIMESTAMP, "sex" character varying, "type" character varying, "document" character varying, "idHealthPlan" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "date" TIMESTAMP, "idPatient" integer, "idMedic" integer, "idPlan" integer, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "personId" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "health_plan" ADD CONSTRAINT "FK_90c1807ac0a53e997e94e985bb4" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_288b181833e4d961d6428e46a55" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_288b181833e4d961d6428e46a55"`);
        await queryRunner.query(`ALTER TABLE "health_plan" DROP CONSTRAINT "FK_90c1807ac0a53e997e94e985bb4"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "health_plan"`);
    }

}
