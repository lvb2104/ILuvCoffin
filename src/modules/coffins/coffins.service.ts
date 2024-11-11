import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffin } from './entities/coffin.entity';
import { Repository } from 'typeorm';
import { CreateCoffinDto } from './dto/create-coffin.dto';
import { UpdateCoffinDto } from './dto/update-coffin.dto';

@Injectable()
export class CoffinsService {
    constructor(
        @InjectRepository(Coffin)
        private readonly coffinRepository: Repository<Coffin>,
    ) {}

    async getAllCoffins() {
        return await this.coffinRepository.find();
    }

    async getCoffinById(id: number) {
        const coffin = await this.coffinRepository.findOneBy({ id: id });
        if (!coffin) {
            throw new HttpException(
                `Coffin #${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        return coffin;
    }

    createCoffin(createCoffinDto: CreateCoffinDto) {
        const coffin = this.coffinRepository.create(createCoffinDto);
        return this.coffinRepository.save(coffin);
    }

    async updateCoffin(id: number, updateCoffinDto: UpdateCoffinDto) {
        const coffin = await this.coffinRepository.preload({
            id: id,
            ...updateCoffinDto,
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
}
