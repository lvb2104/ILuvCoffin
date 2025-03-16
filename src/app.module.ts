import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffinsModule } from './modules/coffins/coffins.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // use Joi to validate the environment variables
            // this is a good practice to ensure that the environment variables are set correctly
            // and to provide default values for them
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.required(),
                POSTGRES_PORT: Joi.number().default(5432),
            }),
            // load custom configuration
            // this is a good practice to separate the configuration from the code
            load: [appConfig],
        }),
        DatabaseModule,
        UsersModule,
        CoffinsModule,
        CommonModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // validation for all routes and all controllers
        {
            // APP_PIPE is a token that represents the ValidationPipe class
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
