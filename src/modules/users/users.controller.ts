import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/models/user.model";

@Controller('users')
export class UsersController {
    constructor(private readonly appService: UsersService) {};

    @Get()
    getAllUsers(): User[] {
        try {
            return this.appService.getAllUsers();
        } catch (error) {
            return null;
        }
    }
    
    @Get(':id')
    getUserById(@Param('id') id: number): User{
        try {
            return this.appService.getUserById(id);
        } catch (error) {
            return null;
        }
    }

    @Post()
    registerUser(@Body() body) {
        return body;
    }
}