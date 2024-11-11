import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly appService: UsersService) {}

    @Get()
    getAllUsers(@Query() paginationQuery) {
        // const { limit, offset } = paginationQuery;
        return this.appService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.appService.getUserById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.appService.createUser(createUserDto);
    }

    @Patch(':id')
    updateUserById(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.appService.updateUserById(id, updateUserDto);
    }

    @Delete(':id')
    removeUserById(@Param('id') id: number) {
        return this.appService.removeUserById(id);
    }
}
