import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
    constructor(
        // inject User entity to use in service
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getAllUsers(paginationQueryDto: PaginationQueryDto) {
        const { limit, offset } = paginationQueryDto;
        return await this.userRepository.find({
            skip: offset,
            take: limit,
        });
    }

    async getUserById(id: number) {
        // guarantee the code execution will wait for the promise to resolve
        const user = await this.userRepository.findOneBy({ id: id });
        if (!user) {
            throw new HttpException(
                `User #${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        return user;
    }

    createUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async updateUserById(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.preload({
            id: id,
            ...updateUserDto,
        });
        if (!user) {
            throw new HttpException(
                `User #${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        return this.userRepository.save(user);
    }

    async removeUserById(id: number) {
        const user = await this.getUserById(id);
        return this.userRepository.remove(user);
    }
}
