import { MigrationInterface, QueryRunner } from "typeorm";

export class CoffinRefactor1731477939873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "coffin" RENAME COLUMN "brand" TO "test"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "coffin" RENAME COLUMN "test" TO "brand"`
        );
    }

}
