import { Injectable } from "@nestjs/common";
import { User } from "src/models/user.model";

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 0,
            name: 'Moda'
        },
        {
            id: 1,
            name: 'John Doe'
        },
        {
            id: 2,
            name: 'Jane Doe'
        },
        {
            id: 3,
            name: 'John Smith'
        },
    ]

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: number): User {
        return this.users.find(user => user.id === Number(id));
    }
}