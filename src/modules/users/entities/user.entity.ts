import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// Define User entity with TypeORM decorators to create User table in database
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('json', { nullable: true })
    phones: string[];
}
