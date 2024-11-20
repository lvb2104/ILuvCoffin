import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CoffinsService } from './coffins.service';
import { CreateCoffinDto } from './dto/create-coffin.dto';
import { UpdateCoffinDto } from './dto/update-coffin.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CustomParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';

@Controller('coffins')
export class CoffinsController {
    constructor(private readonly coffinService: CoffinsService) {}

    @Public()
    @UsePipes(ValidationPipe)
    @Get()
    async getAllCoffins(@Param() paginationQueryDto: PaginationQueryDto) {
        // await new Promise(resolve => setTimeout(resolve, 6000));
        return this.coffinService.getAllCoffins(paginationQueryDto);
    }

    @Public()
    @Get(':id')
    getCoffinById(@Param('id', CustomParseIntPipe) id: number) {
        console.log(id);
        return this.coffinService.getCoffinById(id);
    }

    @Post()
    createCoffin(@Body() createCoffinDto: CreateCoffinDto) {
        return this.coffinService.createCoffin(createCoffinDto);
    }

    @Patch(':id')
    updateCoffin(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateCoffinDto: UpdateCoffinDto,
    ) {
        return this.coffinService.updateCoffin(id, updateCoffinDto);
    }

    @Delete(':id')
    removeCoffinById(@Param('id', ParseIntPipe) id: number) {
        return this.coffinService.removeCoffinById(id);
    }
}
