import { Module } from '@nestjs/common';
import { CoffinsController } from './coffins.controller';
import { CoffinsService } from './coffins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffin } from './entities/coffin.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coffin])],
    controllers: [CoffinsController],
    providers: [CoffinsService],
})
export class CoffinsModule {}
