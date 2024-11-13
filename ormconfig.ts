import { ConfigService } from "@nestjs/config";
import { config } from "dotenv"
import { DataSource } from "typeorm"

config();

const configService = new ConfigService();

export default new  DataSource({
    type: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: configService.getOrThrow('POSTGRES_PORT'),
    username: configService.getOrThrow('POSTGRES_USERNAME'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    database: configService.getOrThrow('POSTGRES_DATABASE'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/src/migrations/*.js'],
    migrationsTableName: "migrations",
    synchronize: false
})