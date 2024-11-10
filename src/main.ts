import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Enable validation pipe to validate incoming request data against DTO classes and whitelist only properties that are defined in the DTO class to avoid unwanted properties in the request body object and transform the incoming request data to the DTO class object type if possible (e.g. string to number) to match the DTO class type definition and forbid non-whitelisted properties to avoid unwanted properties in the request body object that are not defined in the DTO class to be passed to the controller method handler function as an argument object parameter
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );
    const PORT = 3333;
    await app.listen(PORT);
}

bootstrap();
