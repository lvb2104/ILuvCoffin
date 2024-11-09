import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 0,
            name: 'Moda',
        },
        {
            id: 1,
            name: 'John Doe',
        },
        {
            id: 2,
            name: 'Jane Doe',
        },
        {
            id: 3,
            name: 'John Smith',
        },
    ];

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: number) {
        console.log(typeof id);
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new HttpException(
                `Coffin #${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        return user;
    }

    registerUser(createUserDto: any) {
        this.users.push(createUserDto);
        return createUserDto;
    }

    updateUserById(id: number, updateUserDto: any) {
        const existingUser = this.getUserById(id);
        if (existingUser) {
            // Do something in here
        }
    }

    removeOneUser(id: string) {
        const userIndex = this.users.findIndex(
            (item) => item.id === Number(id),
        );
        if (userIndex >= 0) {
            this.users.splice(userIndex, 1);
        }
    }
}
