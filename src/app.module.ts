import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { CoffinsController } from './modules/coffins/coffins.controller';
import { UsersController } from "./modules/users/users.controller";
import { UsersService } from "./modules/users/users.service";

@Module({
    imports: [UsersModule],
    controllers: [UsersController, CoffinsController],
    providers: [UsersService]
})

export class AppModule {}