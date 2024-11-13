import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        // Setup connection to the database
        TypeOrmModule.forRootAsync({
            // Load environment variables from .env file via ConfigService
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow('POSTGRES_HOST'),
                port: configService.getOrThrow('POSTGRES_PORT'),
                username: configService.getOrThrow('POSTGRES_USERNAME'),
                password: configService.getOrThrow('POSTGRES_PASSWORD'),
                database: configService.getOrThrow('POSTGRES_DATABASE'),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
