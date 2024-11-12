import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            // enable auto-transforming payloads to their respective DTO instances
            transform: true,
            // forbid non-whitelisted properties in the payload
            forbidNonWhitelisted: true,
            // enable implicit type conversion
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    const PORT = 3333;
    await app.listen(PORT);
}

bootstrap();
