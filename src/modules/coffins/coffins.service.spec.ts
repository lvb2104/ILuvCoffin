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

// use describe to group the tests for the CoffinsService class and its methods together in a single test suite
describe('CoffinsService', () => {
    let service: CoffinsService;
    let coffinRepository: MockRepository;

    // use beforeEach to run the code that is common for all the tests in the suite
    beforeEach(async () => {
        // create a testing module with metadata for the CoffinsService and its dependencies
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                CoffinsService,
                { provide: DataSource, useValue: {} },
                {
                    provide: getRepositoryToken(Coffin),
                    useValue: createMockRepository(),
                },
                {
                    provide: getRepositoryToken(Color),
                    useValue: createMockRepository(),
                },
            ],
        }).compile();

        // saving the reference to the service and the repository mock to be able to use them in the tests
        service = moduleRef.get<CoffinsService>(CoffinsService);
        coffinRepository = moduleRef.get<MockRepository>(
            getRepositoryToken(Coffin),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // use describe to group the tests for the getCoffinById method together in a single test suite
    describe('getCoffinById', () => {
        describe('when coffin with ID exists', () => {
            it('should return the coffin object', async () => {
                const coffinId = 1;
                const expectedCoffin = {};

                // simulate the behavior of the findOne method of the repository mock to return the expected coffin object when called
                coffinRepository.findOne.mockReturnValue(expectedCoffin);
                const coffin = await service.getCoffinById(coffinId);
                expect(coffin).toEqual(expectedCoffin);
            });
        });

        describe('otherwise', () => {
            it('should throw the "NotFoundException"', async () => {
                const coffinId = 1;
                coffinRepository.findOne.mockReturnValue(undefined);

                try {
                    await service.getCoffinById(coffinId);
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual(
                        `Coffin #${coffinId} not found`,
                    );
                }
            });
        });
    });
});
