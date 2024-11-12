import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffin } from './coffin.entity';

@Entity()
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Coffin, (coffin) => coffin.colors)
    coffins: Coffin[];
}
