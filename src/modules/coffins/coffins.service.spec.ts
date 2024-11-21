import { DataSource, Repository } from 'typeorm';
import { describe, Mock } from 'node:test';
import { CoffinsService } from './coffins.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffin } from './entities/coffin.entity';
import { Color } from './entities/color.entity';
import { NotFoundException } from '@nestjs/common';

// create a mock repository type that has keys of all methods of Repository<T> and mock functions as values for each key
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
// create a mock repository function returning the mock repository type just defined above
const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    create: jest.fn(),
});

describe('CoffinsService', () => {
    let service: CoffinsService;
    let coffinRepository: MockRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoffinsService,
                { provide: DataSource, useValue: {} },
                { provide: getRepositoryToken(Coffin), useValue: createMockRepository() },
                { provide: getRepositoryToken(Color), useValue: createMockRepository() },
            ],
        }).compile();

        service = module.get<CoffinsService>(CoffinsService);
        coffinRepository = module.get<MockRepository>(getRepositoryToken(Coffin));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getCoffinById', () => {
        describe('when coffin with ID exists', () => {
            it('should return the coffin object', async () => {
                const coffinId = 1;
                const expectedCoffin = {};

                coffinRepository.findOne.mockReturnValue(expectedCoffin);
                const coffin = await service.getCoffinById(coffinId);
                expect(coffin).toEqual(expectedCoffin);
            })
        })

        describe('otherwise', () => {
            it('should throw the "NotFoundException"', async () => {
                const coffinId = 1;
                coffinRepository.findOne.mockReturnValue(undefined);

                try {
                    await service.getCoffinById(coffinId);
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual(`Coffin #${coffinId} not found`);
                }
            })
        })
    })
});
