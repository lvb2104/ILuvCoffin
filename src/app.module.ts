import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffinsModule } from './modules/coffins/coffins.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CoffinRatingModule } from './modules/coffin-rating/coffin-rating.module';

@Module({
    imports: [
        // load the environment variables from the .env file
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        UsersModule,
        CoffinsModule,
        CoffinRatingModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
