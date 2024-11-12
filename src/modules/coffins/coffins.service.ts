import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffin } from './entities/coffin.entity';
import { Repository } from 'typeorm';
import { CreateCoffinDto } from './dto/create-coffin.dto';
import { UpdateCoffinDto } from './dto/update-coffin.dto';
import { Color } from './entities/color.entity';
import { create } from 'domain';

@Injectable()
export class CoffinsService {
    constructor(
        @InjectRepository(Coffin)
        private readonly coffinRepository: Repository<Coffin>,
        @InjectRepository(Color)
        private readonly colorRepository: Repository<Color>,
    ) {}

    async getAllCoffins() {
        return await this.coffinRepository.find({
            // load the colors relation from coffin entity (eagerly to avoid n+1 problem when fetching coffins with colors in the controller action handler method)
            relations: ['colors'],
        });
    }

    async getCoffinById(id: number) {
        const coffin = await this.coffinRepository.find({
            where: { id },
            relations: ['colors'],
        });
        if (!coffin) {
            throw new HttpException(
                `Coffin #${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        return coffin;
    }

    async createCoffin(createCoffinDto: CreateCoffinDto) {
        // avoid creating duplicate colors in the database
        const colors = await Promise.all(
            createCoffinDto.colors.map((color) =>
                this.preloadColorByName(color),
        ),
    );
    const coffin = this.coffinRepository.create({
        ...createCoffinDto,
        colors,
    });
    return this.coffinRepository.save(coffin);
}

async updateCoffin(id: number, updateCoffinDto: UpdateCoffinDto) {
        // avoid creating duplicate colors in the database
        const colors = await Promise.all(
            updateCoffinDto.colors.map((color) =>
                this.preloadColorByName(color),
            ),
        );
        const coffin = await this.coffinRepository.preload({
            id: id,
            ...updateCoffinDto,
            colors
        });
        if (!coffin) {
            throw new HttpException(
                `Coffin #${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        return this.coffinRepository.save(coffin);
    }

    async removeCoffinById(id: number) {
        const coffin = await this.getCoffinById(id);
        return this.coffinRepository.remove(coffin);
    }

    // return the real color entity from the database
    private async preloadColorByName(name: string): Promise<Color> {
        // check if the color entity already exists in the database
        const existingColor = await this.colorRepository.findOne({
            where: { name },
        });
        // if the color already exists, return it
        if (existingColor) {
            return existingColor;
        }
        // if the color does not exist, create it and return it
        return this.colorRepository.create({ name });
    }
}