import { Event } from './../../events/entities/event.entity';
import { Module } from '@nestjs/common';
import { CoffinsController } from './coffins.controller';
import { CoffinsService } from './coffins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffin } from './entities/coffin.entity';
import { Color } from './entities/color.entity';

@Module({
    // register entities
    imports: [TypeOrmModule.forFeature([Coffin, Color, Event])],
    controllers: [CoffinsController],
    providers: [CoffinsService],
    // export the service to make it available for other modules that import this module (e.g., the CoffinsModule)
    exports: [CoffinsService],
})
export class CoffinsModule {}
