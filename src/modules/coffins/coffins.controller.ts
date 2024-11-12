import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CoffinsService } from './coffins.service';
import { CreateCoffinDto } from './dto/create-coffin.dto';
import { UpdateCoffinDto } from './dto/update-coffin.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('coffins')
export class CoffinsController {
    constructor(private readonly coffinService: CoffinsService) {}

    @Get()
    getAllCoffins(@Param() paginationQueryDto: PaginationQueryDto) {
        return this.coffinService.getAllCoffins(paginationQueryDto);
    }

    @Get(':id')
    getCoffinById(@Param('id') id: number) {
        return this.coffinService.getCoffinById(id);
    }

    @Post()
    createCoffin(@Body() createCoffinDto: CreateCoffinDto) {
        return this.coffinService.createCoffin(createCoffinDto);
    }

    @Patch(':id')
    updateCoffin(
        @Param('id') id: number,
        @Body() updateCoffinDto: UpdateCoffinDto,
    ) {
        return this.coffinService.updateCoffin(id, updateCoffinDto);
    }

    @Delete(':id')
    removeCoffinById(@Param('id') id: number) {
        return this.coffinService.removeCoffinById(id);
    }
}
