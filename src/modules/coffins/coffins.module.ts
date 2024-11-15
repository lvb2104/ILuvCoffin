import { Module } from '@nestjs/common';
import { CoffinsController } from './coffins.controller';
import { CoffinsService } from './coffins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffin } from './entities/coffin.entity';
import { Color } from './entities/color.entity';
import { Event } from 'src/events/entities/event.entity';

@Module({
    // register entities
    imports: [TypeOrmModule.forFeature([Coffin, Color, Event])],
    controllers: [CoffinsController],
    providers: [CoffinsService
        // {
        //     provide: 'COFFIN_BRANDS',
        //     useValue: ['buddy brew', 'nescafe']
        // }
    ],
    exports: [CoffinsService]
})
export class CoffinsModule {}
