import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
    let controller: AppController;

    // before each test, create a new module with the AppController and get the instance of the controller from the module to test it in the tests below it 
    // this is typically referred to setup phrase
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
        }).compile();

        controller = module.get<AppController>(AppController);
        // controller = await module.resolve<AppController>(AppController); // this is also valid
    });

    // individual test cases
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
