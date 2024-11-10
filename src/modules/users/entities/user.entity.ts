import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Define User entity with TypeORM decorators to create User table in database with columns id, name, and phones as JSON type array with nullable value set to true to allow empty array value in phones column
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('json', { nullable: true })
    phones: string[];
}
