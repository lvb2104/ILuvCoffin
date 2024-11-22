import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CoffinsModule } from '../../src/modules/coffins/coffins.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffinDto } from 'src/modules/coffins/dto/create-coffin.dto';
import 'jasmine';

describe('[Feature] Coffins - /coffins', () => {
    let app: INestApplication;
    let coffin = {
        brand: 'Test brand',
        colors: ['black', 'white'],
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                CoffinsModule,
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5433,
                    username: 'postgres',
                    password: 'moda123',
                    database: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
                transformOptions: {
                    enableImplicitConversion: true,
                },
            }),
        );
        await app.init();
    });

    // todo is a function that marks a test as pending and will be skipped when running the tests and will be completed later
    it('Create [POST /]', async () => {
        return request(app.getHttpServer())
            .post('/coffins')
            .send(coffin as CreateCoffinDto)
            .expect(HttpStatus.CREATED)
            .then(({ body }) => {
                const expectedCoffin = expect.objectContaining({
                    brand: coffin.brand,
                    colors: expect.arrayContaining(
                        coffin.colors.map((color) =>
                            expect.objectContaining({
                                name: color,
                            }),
                        ),
                    ),
                    // Optionally include fields you expect but don't fully validate
                    id: expect.any(Number),
                    recommendations: expect.any(Number),
                });

                expect(body).toEqual(expectedCoffin);
            });
    });
    it.todo('Get all [GET /]');
    it.todo('Get one [GET /:id]');
    it.todo('Update one [PATCH /:id');
    it.todo('Delete one [DELETE /:id]');

    afterAll(async () => {
        await app.close();
    });
});
