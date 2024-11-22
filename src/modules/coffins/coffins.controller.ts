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
import { CustomParseIntPipe } from './../../common/pipes/parse-int/parse-int.pipe';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from './../../common/dto/pagination-query.dto';
import { Public } from './../../common/decorators/public.decorator';
import { Protocol } from './../../common/decorators/protocol.decorator';

// use ApiTags to group the routes in the Swagger documentation UI under the "coffins" tag for better organization and readability of the API documentation UI
@ApiTags('coffins')
@Controller('coffins')
export class CoffinsController {
    constructor(private readonly coffinService: CoffinsService) {}

    // use ApiResponse to define the responses that the route can return with their status codes and descriptions to be displayed in the Swagger documentation UI
    // @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    // use Public "custom decorator" to mark the route as public and allow access to it without authentication
    @Public()
    // This might be redundant if ValidationPipe is applied globally in the main.ts file with app.useGlobalPipes(new ValidationPipe()) or in the module with { provide: APP_PIPE, useClass: Validation } in the providers array of the module decorator metadata object
    @UsePipes(ValidationPipe)
    @Get()
    async getAllCoffins(
        // use Protocol "custom decorator" to inject the protocol of the request into the route handler method
        @Protocol('https') protocol: string,
        @Param() paginationQueryDto: PaginationQueryDto,
    ) {
        // console.log(protocol);
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
