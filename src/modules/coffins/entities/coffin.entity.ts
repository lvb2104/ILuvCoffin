import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coffin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;

    @Column('json', { nullable: true })
    colors: string[];
}
