import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    // use beforeAll to create the app instance before running all the tests not to create it before each test
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        // saving the reference to the app instance to be able to use it in the tests
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        // use request to send an HTTP GET request to the root URL of the app and check the response status and body content using expect method from the supertest library
        return request(app.getHttpServer())
            .get('/')
            .set('Authorization', process.env.API_KEY)
            .expect(200)
            .expect('Hello World!');
    });

    // use after all tests are completed to close the app instance
    afterAll(async () => {
        await app.close();
    });
});
