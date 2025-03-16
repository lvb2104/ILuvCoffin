import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    DataSourceOptions,
    createConnection,
    createConnections,
} from 'typeorm';

// @Module({
//     imports: [
//         // Setup connection to the database
//         TypeOrmModule.forRootAsync({
//             // Load environment variables from .env file via ConfigService
//             useFactory: (configService: ConfigService) => ({
//                 type: 'postgres',
//                 host: configService.getOrThrow('POSTGRES_HOST'),
//                 port: configService.getOrThrow('POSTGRES_PORT'),
//                 username: configService.getOrThrow('POSTGRES_USERNAME'),
//                 password: configService.getOrThrow('POSTGRES_PASSWORD'),
//                 database: configService.getOrThrow('POSTGRES_DATABASE'),
//                 autoLoadEntities: true,
//                 synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
//             }),
//             inject: [ConfigService],
//         }),
//     ],
// })
// export class DatabaseModule {}

@Module({})
export class DatabaseModule {
    static register(options: DataSourceOptions): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: createConnections([options]),
                },
            ],
        };
    }
}
