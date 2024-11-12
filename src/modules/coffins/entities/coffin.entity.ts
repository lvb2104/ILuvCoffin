import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';

@Entity()
export class Coffin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;

    // specify the owner side
    @JoinTable()
    // specify the inverse side
    @ManyToMany((type) => Color, (color) => color.coffins, {
        // cascade: true means that if you save a coffin, all its colors will be saved too
        cascade: true,
    })
    colors: Color[];
}
