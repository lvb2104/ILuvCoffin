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
import { User } from 'src/modules/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly appService: UsersService) {}

    @Get()
    getAllUsers(@Query() paginationQuery): User[] {
        // const { limit, offset } = paginationQuery;
        return this.appService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: number): User {
        return this.appService.getUserById(id);
    }

    @Post()
    registerUser(@Body() createUserDto: CreateUserDto) {
        return this.appService.registerUser(createUserDto);
    }

    @Patch(':id')
    updateUserById(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.appService.updateUserById(id, updateUserDto);
    }

    @Delete(':id')
    removeOneUser(@Param('id') id: string) {
        return this.appService.removeOneUser(id);
    }
}
