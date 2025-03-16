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

    @Column({ default: 0 })
    recommendations: number;

    // specify the owner side of the relationship with the @ManyToMany() decorator and the @JoinTable() decorator
    @JoinTable()
    // specify the inverse side
    @ManyToMany((type) => Color, (color) => color.coffins, {
        // cascade: true means that if you save a coffin, all its colors will be saved too
        // if you remove a coffin, all its colors will be removed too
        cascade: true,
    })
    colors: Color[];
}
